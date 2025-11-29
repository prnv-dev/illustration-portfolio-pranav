import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const ref = useRef(null);
  const form = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ibn1ru5",      // 🔹 Replace with your Service ID
        "template_55chsts",     // 🔹 Replace with your Template ID
        form.current,
        "RwPtkDuSJNskcv33Q"   // 🔹 Replace with your Public Key
      )
      .then(
        () => {
          setLoading(false);
          setIsSent(true);
          form.current.reset();
          setTimeout(() => setIsSent(false), 4000);
        },
        (error) => {
          setLoading(false);
          alert("❌ Error sending message: " + error.text);
        }
      );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="lg:my-16 lg:px-28 my-8 px-5"
      id="contact"
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl lg:text-4xl text-center"
      >
        Contact <span className="font-extrabold">Me</span>
      </motion.h2>

      <div className="flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row">
        {/* ===== LEFT SIDE (Form) ===== */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-[40%]"
        >
          <form ref={form} onSubmit={sendEmail} className="w-full space-y-3 lg:space-y-5">
            <input
              className="border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full"
              type="text"
              name="from_name"
              placeholder="Your name"
              required
            />
            <input
              className="border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full"
              type="email"
              name="reply_to"
              placeholder="Email"
              required
            />
            <input
              className="border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full"
              type="text"
              name="website"
              placeholder="Your website (If exists)"
            />
            <textarea
              className="resize-none border-2 px-5 py-3 h-32 border-black placeholder:text-[#71717A] rounded text-sm w-full"
              name="message"
              placeholder="How can I help?*"
              required
            ></textarea>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="bg-black justify-center w-fit hover:shadow-lg text-white px-6 py-3 rounded flex items-center gap-x-3 font-medium"
                disabled={loading}
              >
                {loading ? "Sending..." : "Get In Touch"}
              </motion.button>
            </motion.div>

            {isSent && (
              <p className="text-green-600 text-center font-medium mt-2">
                ✅ Message sent successfully! Thank You for Contacting Pranav!
              </p>
            )}
          </form>
        </motion.div>

        {/* ===== RIGHT SIDE (Info) ===== */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="font-extrabold text-2xl lg:text-5xl mt-5 lg:mt-0 space-y-1 lg:space-y-3">
            <h2>
              Let's <span className="text-white" style={{ WebkitTextStroke: "1px black" }}>talk</span> for
            </h2>
            <h2>Something special</h2>
          </div>

          <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6">
            I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
          </p>

          <div className="font-semibold text-sm lg:text-xl flex flex-col mt-6 gap-2 lg:gap-4">
            <motion.a
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 group"
              href="mailto:iampranavkadam@gmail.com"
            >
              <span className="border-2 transition-all border-transparent group-hover:border-black rounded-full p-1">
                <IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              iampranavkadam@gmail.com
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 group"
              href="tel:+91"
            >
              <span className="border-2 transition-all border-transparent group-hover:border-black rounded-full p-[5px]">
                <FaPhone className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
              sorry , can't share
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
