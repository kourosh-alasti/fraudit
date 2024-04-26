import { UserProfile } from "@clerk/nextjs";

const EditProfilePage = () => {
  return (
    <div className="flex items-center justify-center">
      <UserProfile />
    </div>
  );
};

export default EditProfilePage;
