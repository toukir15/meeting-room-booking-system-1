import { motion } from "framer-motion";
import CEO from "/images/ourTeam/CEO.jpg";
import CTO from "/images/ourTeam/CTO.jpg";
import "./MeetOurTeam.css";

const teamMembers = [
  {
    name: "Toukir Ahmed",
    role: "CEO",
    bio: "Toukir leads the company...",
    image: CEO,
    imageNo: "image1",
  },
  {
    name: "Arafat Shouvo",
    role: "CTO",
    bio: "Shouvo oversees technology...",
    image: CTO,
    imageNo: "image2",
  },
  // Add more team members as needed
];

const MeetTheTeam = () => (
  <section className="meet-the-team-section bg-white container mx-auto text-center py-10 md:py-20">
    <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-20">
      Meet the Team
    </h2>
    <div className="flex flex-col items-center gap-10 sm:gap-20">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="team-member-card w-full max-w-xs"
        >
          <div className="team-member-image w-[280px] sm:w-[350px] md:w-[400px] cursor-pointer mx-auto">
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              className={`w-full h-full object-cover relative right-10 ${member.imageNo}`}
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mt-4">
            {member.name}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">{member.role}</p>
          <p className="mt-2 text-sm sm:text-base">{member.bio}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default MeetTheTeam;
