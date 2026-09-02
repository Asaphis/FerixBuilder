/**
 * External API integration for FerixBuilder
 * This file can be used for third-party API integrations
 */
import { ENV } from "./env";

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  // Placeholder for external API integrations
  // Currently not configured - add your third-party API calls here
  throw new Error("External API integration not configured");
}
