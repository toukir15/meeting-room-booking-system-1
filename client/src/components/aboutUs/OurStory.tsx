import { motion } from "framer-motion";

const OurStory = () => (
  <section className="py-10 md:py-20 lg:py-32 bg-[#F7F9FB] text-center">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Story</h2>
        <p className="max-w-4xl text-justify md:text-center mx-auto text-base sm:text-lg mb-6">
          Our journey began in 2022 when Toukir Ahmed set out to revolutionize
          the way organizations manage their meeting spaces. Recognizing the
          inefficiencies and frustrations associated with traditional room
          booking systems, Toukir envisioned a platform that would not only
          streamline the process but also enhance productivity across teams.
          With a clear mission in mind, he assembled a dedicated team of experts
          in technology and design to bring this vision to life.
        </p>
        <div className="flex flex-wrap justify-between gap-8 lg:gap-16 mt-12">
          <div className="max-w-xs text-left mx-auto lg:mx-0">
            <h4 className="text-lg sm:text-xl font-semibold">
              2022 - The Beginning
            </h4>
            <p className="text-justify mt-3 text-gray-700 text-sm sm:text-base">
              We started with a simple yet powerful idea: to make meeting room
              management effortless and efficient. Toukir Ahmed, with his deep
              understanding of workplace challenges, founded the company with
              the goal of eliminating the frustrations associated with
              traditional room booking systems. We launched our first version,
              offering basic scheduling features that immediately resonated with
              small businesses.
            </p>
          </div>
          <div className="max-w-xs text-left mx-auto lg:mx-0">
            <h4 className="text-lg sm:text-xl font-semibold">
              2023 - First Major Milestone
            </h4>
            <p className="text-justify mt-3 text-gray-700 text-sm sm:text-base">
              Building on our initial success, we introduced real-time
              availability tracking, which allowed users to see room statuses
              instantly and avoid double bookings. We also integrated with
              popular calendar systems like Google Calendar and Outlook, making
              it easier for teams to manage their schedules in one place. This
              year marked our expansion into larger organizations, who
              appreciated the enhanced functionality and ease of use.
            </p>
          </div>
          <div className="max-w-xs text-left mx-auto lg:mx-0">
            <h4 className="text-lg sm:text-xl font-semibold">
              2024 - Advanced Features
            </h4>
            <p className="text-justify mt-3 text-gray-700 text-sm sm:text-base">
              In 2024, we rolled out advanced analytics and reporting tools,
              enabling organizations to gain insights into their meeting room
              usage patterns and optimize their space allocation. We also
              introduced customizable room booking policies, catering to the
              specific needs of enterprises with complex scheduling
              requirements. By this time, our platform was being adopted by
              businesses across multiple continents.
            </p>
          </div>
          <div className="max-w-xs text-left mx-auto lg:mx-0">
            <h4 className="text-lg sm:text-xl font-semibold">
              2025 - Future Innovations
            </h4>
            <p className="text-justify mt-3 text-gray-700 text-sm sm:text-base">
              Looking ahead, we are focused on integrating AI-driven features
              that predict room availability and suggest optimal meeting times
              based on participants' schedules. We are also exploring the use of
              IoT devices to enhance real-time room monitoring and environmental
              controls, ensuring that every meeting is not only well-organized
              but also comfortable. Our commitment to innovation continues.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default OurStory;
