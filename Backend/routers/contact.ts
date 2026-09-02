import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

export const contactInquiryInput = z.object({
  name: z.string().trim().min(2).max(160),
  businessName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  serviceType: z.enum(["business_website", "online_store", "booking_system", "customer_portal", "custom_application"]),
  message: z.string().trim().min(20).max(5000),
});

export const contactRouter = router({
  submit: publicProcedure.input(contactInquiryInput).mutation(async ({ input }) => {
    // TODO: Implement contact inquiry storage
    return { id: "temp-id", accepted: true } as const;
  }),
});
