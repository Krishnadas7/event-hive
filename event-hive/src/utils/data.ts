export interface EventType  {
    value: string;
    label: string;
    disabled?: boolean;
  };
export interface ParticipanyTypes{
  value:string;
  label:string;
}
export const participantTypes:ParticipanyTypes[] = [
  {value:"singular",label:"Singular"},
  {value:"team",label:'Team'}
]
export const eventTypes:EventType[] = [
    { value: "", label: "Select an event", disabled: true },
    { value: "hackathons", label: "Hackathons" },
    { value: "workshops", label: "Workshops" },
    { value: "seminars", label: "Seminars" },
    { value: "conferences", label: "Conferences" },
    { value: "webinars", label: "Webinars" },
    { value: "meetups", label: "Meetups" },
    { value: "techTalks", label: "Tech Talks" },
    { value: "productLaunches", label: "Product Launches" },
    { value: "developerBootcamps", label: "Developer Bootcamps" },
    { value: "networkingEvents", label: "Networking Events" },
    { value: "panelDiscussions", label: "Panel Discussions" },
    { value: "codingCompetitions", label: "Coding Competitions" },
    { value: "innovationShowcases", label: "Innovation Showcases" },
    { value: "userGroupMeetings", label: "User Group Meetings" },
    { value: "industrySummits", label: "Industry Summits" },
    { value: "techExpos", label: "Tech Expos" },
    { value: "careerFairs", label: "Career Fairs" },
    { value: "firesideChats", label: "Fireside Chats" },
    { value: "demoDays", label: "Demo Days" },
    { value: "virtualRealityExperiences", label: "Virtual Reality (VR) Experiences" },
  ];
  