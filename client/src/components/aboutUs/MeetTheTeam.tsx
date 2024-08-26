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
  <section className="py-40 bg-white container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-20">Meet the Team</h2>
    <div className="flex flex-wrap justify-center gap-20">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xs"
        >
          <div className="w-[400px] cursor-pointer">
            <img
              src={member.image}
              alt="Person working"
              className={`w-[400px] h-[400px] object-cover ${member.imageNo} `}
            />
            <h3 className="text-2xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
            <p className="mt-2">{member.bio}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default MeetTheTeam;
