import { motion } from "framer-motion";

const OurMission = () => (
  <section className="py-40 bg-[#F7F9FB] ">
    <div className="flex justify-center container mx-auto ">
      <div className="w-2/3">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
          <p className=" text-center text-lg text-gray-600">
            Our mission is to streamline the way teams and organizations manage
            their meeting spaces. We are committed to providing an intuitive and
            efficient booking system that ensures every meeting room is utilized
            effectively, minimizing scheduling conflicts and maximizing
            productivity. Our goal is to create a seamless experience that
            empowers users to focus on what matters most: collaboration and
            innovation. By simplifying the process of reserving meeting rooms,
            we help organizations run smoother, enabling teams to connect and
            collaborate without the hassle of scheduling challenges.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default OurMission;
