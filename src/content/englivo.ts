export const englivo = {
  title: "Englivo (The AI Fluency Engine)",
  subtitle:
    "An AI-native environment where users receive instantaneous feedback on grammar, pronunciation, and pace.",

  phase1: {
    title: "1. The Market Insight",
    points: [
      { bold: "The Discovery", text: "Through extensive market research and competitive analysis of existing EdTech platforms, I identified a critical gap: while many apps focus on vocabulary, they fail to address \"Speaking Latency\" - the cognitive delay between thought and speech." },
      { bold: "User Pain Point", text: "Interviews with language learners revealed that traditional solo practice lacks the real-time feedback necessary to reduce this hesitation in high-pressure conversations." },
      { bold: "The Hypothesis", text: "If learners receive immediate, AI-driven feedback during speech, they can close the \"fluency gap\" faster than through passive learning." }
    ]
  },

  phase2: {
    title: "2. Product Strategy & Prioritization",
    points: [
      { bold: "Objective", text: "Build an AI-native environment where users receive instantaneous feedback on grammar, pronunciation, and pace." },
      { bold: "Feature Roadmap", text: "Prioritized a \"Zero-Latency\" feedback loop as the MVP, focusing on real-time transcription and correction cycles." },
      { bold: "Strategic Tech Selection", text: "Moved away from standard solutions to more robust, scalable infrastructure:\n• LiveKit: Chosen for high-performance, real-time audio streaming to ensure the feedback loop feels \"human-speed.\"\n• Clerk: Integrated for secure, frictionless user authentication and management." }
    ]
  },

  phase3: {
    title: "3. Engineering Execution",
    points: [
      { bold: "Database Architecture", text: "Built a relational data model on PostgreSQL, hosted on Neon, to ensure data integrity and performance during high-concurrency usage." },
      { bold: "AI Integration", text: "Leveraged Generative AI (Claude/Gemini) to analyze spoken inputs and provide empathetic, high-quality corrections." },
      { bold: "Rapid Iteration", text: "Used Next.js and TypeScript within Cursor/VS Code to move from a research concept to a functional production-grade application in a high-velocity sprint." },
      { bold: "Quality Control", text: "Applied QA protocols inspired by my work at Vaidik Eduservices to ensure AI-generated responses met strict educational standards." }
    ]
  },

  phase4: {
    title: "4. Measurable Outcomes",
    points: [
      { bold: "Market Alignment", text: "Successfully transformed unstructured user feedback into a production-ready system that targets the specific \"Speaking Latency\" problem." },
      { bold: "Enterprise-Ready Infrastructure", text: "The combination of LiveKit and Neon demonstrates an ability to architect systems that can scale to meet the requirements of top-tier partners like TELUS International or Tech Mahindra." },
      { bold: "Product Impact", text: "Englivo now serves as the benchmark for how I merge Market Intelligence with high-performance engineering to solve validated business problems." }
    ]
  }
};
