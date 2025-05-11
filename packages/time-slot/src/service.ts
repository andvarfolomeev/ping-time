import { DaySlots, DaySlotsIndex, ParticipantInfo } from "./types";

export class DaySlotsService {
  public data: DaySlots;

  constructor(data?: DaySlots) {
    if (!data) {
      this.data = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((label) => ({
        label,
        timeSlots: Array.from({ length: 24 * 4 }, () => ({
          participants: {},
        })),
      }));
    } else {
      this.data = data;
    }
  }

  static createSeeded() {
    const result = new DaySlotsService();
    result.fill(
      { dayIndex: 0, timeIndex: 0 },
      { dayIndex: 0, timeIndex: 10 },
      "Mike",
    );
    result.fill(
      { dayIndex: 0, timeIndex: 0 },
      { dayIndex: 5, timeIndex: 15 },
      "Steve",
    );
    result.fill(
      { dayIndex: 0, timeIndex: 4 },
      { dayIndex: 4, timeIndex: 13 },
      "Jane",
    );
    return result;
  }

  fill(
    start: DaySlotsIndex,
    end: DaySlotsIndex,
    username: string,
    isAdding: boolean = true,
  ) {
    for (let dayIndex = start.dayIndex; dayIndex <= end.dayIndex; dayIndex++) {
      for (
        let timeIndex = start.timeIndex;
        timeIndex <= end.timeIndex;
        timeIndex++
      ) {
        if (isAdding) {
          this.add({ dayIndex, timeIndex }, username);
        } else {
          this.remove({ dayIndex, timeIndex }, username);
        }
      }
    }
  }

  add({ dayIndex, timeIndex }: DaySlotsIndex, username: string): void {
    this.data[dayIndex].timeSlots[timeIndex].participants[username] = null;
  }

  remove({ dayIndex, timeIndex }: DaySlotsIndex, username: string): void {
    delete this.data[dayIndex].timeSlots[timeIndex].participants[username];
  }

  getAvailability(
    { dayIndex, timeIndex }: DaySlotsIndex,
    username: string,
  ): boolean {
    return Object.hasOwn(
      this.data[dayIndex].timeSlots[timeIndex].participants,
      username,
    );
  }

  count({ dayIndex, timeIndex }: DaySlotsIndex): number {
    return Object.keys(this.data[dayIndex].timeSlots[timeIndex].participants)
      .length;
  }

  getParticipants(): Set<string> {
    const participants = new Set<string>();
    this.data.map((day) => {
      day.timeSlots.map((timeSlot) => {
        for (const participant of Object.keys(timeSlot.participants)) {
          participants.add(participant);
        }
      });
    });
    return participants;
  }

  getParticipantsInfo(index: DaySlotsIndex): ParticipantInfo[] {
    return Array.from(this.getParticipants().values())
      .map((name) => ({
        name,
        available: this.getAvailability(index, name),
      }))
      .sort((a, b) => Number(b.available) - Number(a.available));
  }

  extractUserActivity(username: string): DaySlotsService {
    return new DaySlotsService(
      this.data.map((day) => ({
        label: day.label,
        timeSlots: day.timeSlots.map((timeSlot) => ({
          participants: Object.hasOwn(timeSlot.participants, username)
            ? { [username]: null }
            : {},
        })),
      })),
    );
  }

  merge(userActivity: DaySlots, username: string): DaySlotsService {
    for (let dayIndex = 0; dayIndex < this.data.length; dayIndex++) {
      const groupDay = this.data[dayIndex];
      const userDay = userActivity[dayIndex];

      for (
        let timeIndex = 0;
        timeIndex < groupDay.timeSlots.length;
        timeIndex++
      ) {
        const groupTimeSlot = groupDay.timeSlots[timeIndex];
        const userTimeSlot = userDay.timeSlots[timeIndex];

        const existsInUserTimeSlot = Object.hasOwn(
          userTimeSlot.participants,
          username,
        );

        const existsInGroupTimeSlot = Object.hasOwn(
          groupTimeSlot.participants,
          username,
        );

        if (existsInUserTimeSlot) {
          groupTimeSlot.participants[username] = null;
        }

        if (!existsInUserTimeSlot && existsInGroupTimeSlot) {
          delete groupTimeSlot.participants[username];
        }
      }
    }
    return this;
  }
}
