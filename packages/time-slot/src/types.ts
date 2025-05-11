import { z } from "zod";
import {
  DaySlotScheme,
  DaySlotsScheme,
  ParticipantsScheme,
  SyncScheme,
  TimeSlotScheme,
} from "./schemes";

export type Participants = z.infer<typeof ParticipantsScheme>;

export type TimeSlot = z.infer<typeof TimeSlotScheme>;

export type DaySlot = z.infer<typeof DaySlotScheme>;

export type DaySlots = z.infer<typeof DaySlotsScheme>;

export type Sync = z.infer<typeof SyncScheme>;

export type ParticipantInfo = {
  name: string;
  available: boolean;
};

export type DaySlotsIndex = {
  dayIndex: number;
  timeIndex: number;
};
