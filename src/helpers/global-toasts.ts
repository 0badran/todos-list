import { toast } from "sonner";

export function toastError(text: string) {
   toast.error(text, {
      style: {
         background: "#E7000B",
         color: "white"
      }
   });
}

export function toastSuccess(text: string) {
   toast.success(text, {
      style: {
         background: "#00A63E",
         color: "white"
      }
   });
}