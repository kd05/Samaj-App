import { API_ROUTES } from "@/src/config/api";
import {
  getNumberField,
  getObjectField,
  getStringField,
  type ApiRecord,
} from "@/src/utils/apiFields";
import { getResponseCollection, requestJson, type ApiSuccessResponse } from "./apiClient";

type ApiMember = ApiRecord;
type ApiEnvelope = ApiSuccessResponse<Record<string, unknown>>;

export type MemberListItem = {
  id: string;
  fullName: string;
  age: string;
  dateOfBirth: string;
  currentCity: string;
  gender: string;
  province: string;
  locationLabel: string;
  village: string;
  occupation: string;
  canadaStatus?: string;
};

export async function fetchVillages() {
  const { response, data } = await requestJson<ApiEnvelope>(API_ROUTES.villages, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const villages = getResponseCollection<ApiRecord>(data, "villages")
    .map((item) => getStringField(item, ["title", "name"]))
    .filter(Boolean);

  if (!response.ok || villages.length === 0) {
    throw new Error(data?.message || "Unable to fetch villages.");
  }

  return villages;
}

export async function fetchMembers() {
  const { response, data } = await requestJson<ApiEnvelope>(API_ROUTES.members, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const members = getResponseCollection<ApiMember>(data, "members")
    .map(mapApiMember)
    .filter((member): member is MemberListItem => member !== null);

  if (!response.ok) {
    throw new Error(data?.message || "Unable to fetch members.");
  }

  return members;
}

function mapApiMember(item: ApiMember): MemberListItem | null {
  const acf = getObjectField(item, "acf");
  const id = getStringField(item, ["id", "ID", "member_id"]);
  const firstName = getStringField(item, ["first_name", "firstName", "fname"]);
  const lastName = getStringField(item, ["last_name", "lastName", "lname"]);
  const fullName =
    getStringField(item, ["full_name", "fullName", "name", "title"]) ||
    [firstName, lastName].filter(Boolean).join(" ").trim();
  const village =
    getStringField(acf, ["village"]) ||
    getStringField(item, ["village", "village_name", "villageName"]);

  if (!id || !fullName || !village) {
    return null;
  }

  const city =
    getStringField(acf, ["city"]) ||
    getStringField(item, ["current_city", "currentCity", "city", "location"]) ||
    "N/A";
  const province = getStringField(acf, ["province"]) || getStringField(item, ["province"]) || "N/A";

  return {
    id,
    fullName,
    age: getNumberField(item, ["age"]),
    dateOfBirth:
      getStringField(acf, ["date_of_birth"]) ||
      getStringField(item, ["date_of_birth", "dateOfBirth", "dob", "birth_date"]) ||
      "N/A",
    currentCity: city,
    gender: getStringField(acf, ["gender"]) || getStringField(item, ["gender"]) || "N/A",
    province,
    locationLabel: `${city}, ${province}`,
    village,
    occupation:
      getStringField(acf, ["designation"]) ||
      getStringField(item, ["occupation", "profession", "job_title", "jobTitle"]) ||
      "N/A",
    canadaStatus:
      getStringField(acf, ["current_status_in_canada"]) ||
      getStringField(item, [
        "canada_status",
        "canadaStatus",
        "status_in_canada",
        "statusInCanada",
      ]) ||
      undefined,
  };
}
