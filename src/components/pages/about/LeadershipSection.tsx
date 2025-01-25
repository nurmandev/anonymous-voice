import Image from "next/image";
import { TeamMember } from "./types.about";

const members: TeamMember[] = [
  {
    name: "Sarah Thompson",
    role: "Volunteer",
    image: "/images/sarah2.png",
  },
  {
    name: "John Martinez",
    role: "Volunteer",
    image: "/images/john2.png",
  },
  {
    name: "Emily Chen",
    role: "Volunteer",
    image: "/images/emily2.png",
  },
  {
    name: "Michael Patel",
    role: "Volunteer",
    image: "/images/michael2.png",
  },
  {
    name: "Sarah Thompson",
    role: "Volunteer",
    image: "/images/sarah3.png",
  },
  {
    name: "John Martinez",
    role: "Volunteer",
    image: "/images/john3.png",
  },
  {
    name: "Emily Chen",
    role: "Volunteer",
    image: "/images/emily3.png",
  },
  {
    name: "Michael Patel",
    role: "Volunteer",
    image: "/images/michael3.png",
  },
];

export default function LeadershipSection() {
  return (
    <section className="w-full px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-violet mb-10">
          Our Leadership
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="object-cover"
                  layout="fill"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-gray-900 text-center">
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-soft-paste text-white border-0"
          >
            See More
          </Button>
        </div> */}
      </div>
    </section>
  );
}
