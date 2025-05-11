import { z } from "zod";

export const ParticipantsScheme = z.record(z.string(), z.null());

export const TimeSlotScheme = z.object({
  participants: ParticipantsScheme,
});

export const DaySlotScheme = z.object({
  label: z.string(),
  timeSlots: z.array(TimeSlotScheme),
});

export const DaySlotsScheme = z.array(DaySlotScheme);

export const SyncScheme = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  daySlots: DaySlotsScheme,
});
