import dayjs from 'dayjs';

export const newEventSchema = {
  schedule: {
    registrationStart: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    registrationEnd: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    eventStart: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    eventEnd: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    submissionStart: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    submissionEnd: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  },
  published: false,
  status: "",
  eventId: "",
  eventName: "",
  eventTagline: "",
  shortDesc: "",
  longDesc: "",
  overview: "",
  eventStructure: [""],
  rules: [""],
  prizes: [""],
};
