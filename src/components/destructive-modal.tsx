import { leaveUserMembership } from "@/actions/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteFrauditBySlug } from "@/actions/fraudit";

interface Props {
  mode: "leave" | "delete";
  slug: string;
  children: React.ReactNode;
}

export const DestructiveModal = ({ children, mode, slug }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const content =
    mode === "delete"
      ? "This action cannot be undone. This will permanently delete your fraudit and remove its data from our servers"
      : "This action is reversible, but you will not be able to post to this fraudit anymore";

  const deleteFraudit = () => {
    deleteFrauditBySlug(slug)
      .then(() => {
        toast({
          variant: "success",
          title: "Fraudit Deleted",
          description: "Fraudit has been deleted",
        });

        router.push("/app");
      })
      .catch((err: any) => {
        toast({
          variant: "destructive",
          title: "An Error Occured",
          description:
            err.message || "Failed to delete Fraudit, please try again later",
        });

        console.error(err || "An Error Occured");
      });
  };

  const leaveFraudit = () => {
    leaveUserMembership({ slug })
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully left the fraudit",
          variant: "success",
        });

        router.refresh();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An Error Occured",
          description: err.message || "Failed to leave the fraudit",
        });

        console.error(err || "An Error Occured");
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-600"
            onClick={mode === "delete" ? deleteFraudit : leaveFraudit}
          >
            {mode === "delete" ? "Delete" : "Leave"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
