import { englivo } from "@/content/englivo";
import IntelligenceField from "@/components/IntelligenceField";

export default function EnglivoPage() {
  return (
    <main className="max-w-6xl mx-auto py-20 px-6 space-y-28">
      {/* HERO */}
      <section className="relative grid md:grid-cols-2 gap-12 items-center">
        <IntelligenceField />
        <div>
          <p className="text-sm font-medium tracking-wide text-indigo-500 uppercase">
            Flagship System
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight">
            Englivo - The AI Fluency Engine
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            {englivo.subtitle}
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/homepagedark_o4fhlv.png"
          alt="Englivo homepage"
          className="rounded-2xl shadow-xl"
        />
      </section>

      {/* THE FLUENCY GAP */}
      <section>
        <h2 className="text-3xl font-semibold tracking-tight">The Fluency Gap</h2>
        <p className="mt-6 text-gray-600 leading-relaxed">{englivo.problem}</p>
      </section>

      {/* PSYCHOLOGY */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Why People Hesitate
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">{englivo.insight}</p>
        </div>
        <img
          src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/heartheshift_wuqs50.png"
          alt="Psychology of speaking confidence"
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* THE SYSTEM */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/thefluencyengine_xkp1b8.png"
          alt="Englivo fluency engine"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            The Fluency Engine
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">{englivo.system}</p>
        </div>
      </section>

      {/* ENGINEERING */}
      <section>
        <h2 className="text-3xl font-semibold tracking-tight">The Engineering</h2>
        <p className="mt-6 text-gray-600 leading-relaxed">
          {englivo.engineering}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <img
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/Dashboard1_aklund.png"
            alt="Fluency dashboard"
            className="rounded-xl shadow-lg"
          />
          <img
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/dashboard2_u96f91.png"
            alt="Fluency metrics"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* WHY IT WINS */}
      <section>
        <h2 className="text-3xl font-semibold tracking-tight">
          Why Englivo Wins
        </h2>
        <p className="mt-6 text-gray-600 leading-relaxed">{englivo.outcome}</p>
      </section>
    </main>
  );
}

