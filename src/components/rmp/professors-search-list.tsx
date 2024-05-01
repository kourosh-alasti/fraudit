import { getUniversityById } from "@/db/queries/university/get-university-by-id";
import { professors } from "@/db/schema";
import { ProfessorSearchItem } from "./professor-search-item";

interface Props {
  professors: (typeof professors.$inferSelect)[];
}

// type TESTPROFS = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   rating: number;
//   universityId: string;
// };

// const testProfessors: TESTPROFS[] = [
//   {
//     id: "26caccfb-49b2-4a41-b3a5-8449d8a7e24f",
//     firstName: "John",
//     lastName: "Smith",
//     email: "john.smith@example.com",
//     rating: 4.8,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "5360623f-dbf0-49bf-845b-3b6e9e7cbf36",
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane.doe@example.com",
//     rating: 4.5,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "87d9462d-85b5-4c08-83e4-c50f03d4b520",
//     firstName: "Michael",
//     lastName: "Johnson",
//     email: "michael.johnson@example.com",
//     rating: 4.2,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "c4f16b72-fd54-4760-bc1b-8b837f9ff49b",
//     firstName: "Emily",
//     lastName: "Williams",
//     email: "emily.williams@example.com",
//     rating: 4.7,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "dc26e9b8-4a7f-45bb-b0d8-ef01b75dbfc2",
//     firstName: "James",
//     lastName: "Brown",
//     email: "james.brown@example.com",
//     rating: 4.1,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "d1dc82e1-8e58-42e8-91ee-8c2bf4f4a079",
//     firstName: "Emma",
//     lastName: "Jones",
//     email: "emma.jones@example.com",
//     rating: 4.9,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "b7dfb84e-6565-4844-af25-cd4b59f0f2ff",
//     firstName: "William",
//     lastName: "Davis",
//     email: "william.davis@example.com",
//     rating: 4.6,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "85d58363-83de-4f12-bd9d-3f6b75053da6",
//     firstName: "Olivia",
//     lastName: "Miller",
//     email: "olivia.miller@example.com",
//     rating: 4.3,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "ef434e6e-33b0-4b88-9a4b-7d51a4589de1",
//     firstName: "Ethan",
//     lastName: "Wilson",
//     email: "ethan.wilson@example.com",
//     rating: 4.8,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
//   {
//     id: "97c7657e-67f5-4e5b-aa7b-bb8e31499c60",
//     firstName: "Sophia",
//     lastName: "Moore",
//     email: "sophia.moore@example.com",
//     rating: 4.4,
//     universityId: "5d617113-160f-40af-a345-10f3c7297029",
//   },
// ];

export const ProfessorsSearchList = ({ professors }: Props) => {
  return (
    <div className="flex flex-col">
      {professors.length === 0 && (
        <div className="mt-10 flex flex-col items-center justify-center font-semibold">
          <p className="text-sm sm:text-base md:text-lg">
            No Professors Found.
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            Try searching for another professor
          </p>
        </div>
      )}

      {professors.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 md:gap-4">
          {professors.map((prof) => (
            <ProfessorSearchItem key={prof.id} professor={prof} />
          ))}
        </div>
      )}
    </div>
  );
};
