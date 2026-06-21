import type { TenantBundle } from "../types";
import { jrc } from "./jrc";
import { sympafit } from "./sympafit";
import { bcp } from "./bcp";
import { libero } from "./libero";

/**
 * All tenant bundles in display order. Default = JRC 医療IT (the richest
 * scenario from the meeting). The order here drives the rail tenant switcher.
 */
export const TENANT_BUNDLES: TenantBundle[] = [jrc, sympafit, bcp, libero];
