"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleHelp,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Waves,
  Gauge,
  Target,
  ShoppingBag,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const featuredProducts = [
  {
    id: 1,
    brand: "HEAD",
    name: "Speed Motion",
    type: "Allround",
    price: "249 €",
    fit: "Schnelles Handling, leichte Power",
    description:
      "Ein schneller, vielseitiger Schläger mit leichtem Handling und lebendigem Spielgefühl für Spieler, die eine hochwertige Allround-Option suchen.",
    weight: "355 g",
    balance: "Mittel",
    shape: "Tropfenform",
    level: "Anfänger bis Fortgeschritten",
    highlights: ["Leicht zu manövrieren", "Fehlerverzeihender Sweet Spot", "Starkes Allround-Gefühl"],
  },
  {
    id: 2,
    brand: "NOX",
    name: "AT10 Genius",
    type: "Kontrolle / Power",
    price: "289 €",
    fit: "Ausgewogenes Gefühl für ambitionierte Spieler",
    description:
      "Eine hochwertige Balance aus Präzision, Stabilität und kontrollierter Power. Sehr passend für ambitionierte Spieler, die Vielseitigkeit wollen.",
    weight: "360–365 g",
    balance: "Mittel-Hoch",
    shape: "Tropfenform",
    level: "Fortgeschritten bis Advanced",
    highlights: ["Stabil unter Druck", "Hochwertiges Spielgefühl", "Ausgewogenes Leistungsprofil"],
  },
  {
    id: 3,
    brand: "Bullpadel",
    name: "Vertex 04",
    type: "Power",
    price: "299 €",
    fit: "Aggressives Ansprechverhalten und hohe Balance",
    description:
      "Eine explosivere, offensiv ausgerichtete Option für Spieler, die Druck, Tempo und harte Abschlüsse vor allem über Kopf lieben.",
    weight: "365–370 g",
    balance: "Hoch",
    shape: "Diamantform",
    level: "Advanced",
    highlights: ["Explosive Overheads", "Aggressives Feedback", "Klare Offensiv-Identität"],
  },
  {
    id: 4,
    brand: "Adidas",
    name: "Metalbone Team",
    type: "Power / Komfort",
    price: "219 €",
    fit: "Fehlerverzeihend und trotzdem explosiv",
    description:
      "Eine zugänglichere Power-Option mit Komfort, Fehlerverzeihung und starker Optik für Spieler, die ihr offensives Spiel weiterentwickeln wollen.",
    weight: "360–365 g",
    balance: "Mittel-Hoch",
    shape: "Diamantform",
    level: "Anfänger bis Fortgeschritten",
    highlights: ["Zugängliche Power", "Komfortables Spielgefühl", "Starkes Preis-Leistungs-Profil"],
  },
];

type Product = (typeof featuredProducts)[number];

type Answers = {
  level: string;
  style: string;
  feel: string;
};

type QuizStep = {
  id: keyof Answers;
  label: string;
  options: string[];
};

const quizSteps: QuizStep[] = [
  {
    id: "level",
    label: "Wie würdest du dein Spielniveau beschreiben?",
    options: ["Anfänger", "Fortgeschritten", "Advanced"],
  },
  {
    id: "style",
    label: "Was ist dir in deinem Spiel wichtiger?",
    options: ["Kontrolle", "Ausgewogen", "Power"],
  },
  {
    id: "feel",
    label: "Welches Spielgefühl bevorzugst du?",
    options: ["Leicht & einfach", "Stabil & präzise", "Aggressiv & solid"],
  },
];

const recommendationMap: Record<string, number> = {
  "Anfänger-Kontrolle-Leicht & einfach": 1,
  "Anfänger-Ausgewogen-Leicht & einfach": 1,
  "Fortgeschritten-Ausgewogen-Stabil & präzise": 2,
  "Fortgeschritten-Kontrolle-Stabil & präzise": 2,
  "Advanced-Power-Aggressiv & solid": 3,
  "Fortgeschritten-Power-Aggressiv & solid": 4,
};

const productCollections = [
  {
    title: "Power-Schläger",
    text: "Für Spieler, die eine höhere Balance, stärkere Abschlüsse und ein explosiveres Ansprechverhalten wollen.",
  },
  {
    title: "Kontroll-Schläger",
    text: "Für saubere Platzierung, besseres Ballgefühl und mehr Kontrolle in Drucksituationen.",
  },
  {
    title: "Allround-Empfehlungen",
    text: "Vielseitige Modelle mit guter Mischung aus Komfort, Fehlerverzeihung und Performance.",
  },
];

const trustPoints = [
  {
    icon: Search,
    title: "Kuratiertes Sortiment",
    text: "Eine klare, fokussierte Auswahl statt eines endlosen und unübersichtlichen Katalogs.",
  },
  {
    icon: CircleHelp,
    title: "Intelligente Beratung",
    text: "Ein geführter Schläger-Finder für bessere und sicherere Kaufentscheidungen.",
  },
  {
    icon: ShieldCheck,
    title: "Premium-Vertrauen",
    text: "Hochwertige Präsentation, klare Specs und ein Kaufprozess, der sich edel anfühlt.",
  },
];

function getRecommendationId(answers: Answers): number {
  const key = `${answers.level}-${answers.style}-${answers.feel}`;
  return recommendationMap[key] || 2;
}

function RacketVisual({ large = false }: { large?: boolean }) {
  return (
    <motion.div
      animate={{ y: [-4, 0, -4] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className={`relative flex items-center justify-center overflow-hidden rounded-[34px] ${
        large ? "h-[560px] w-full" : "h-[390px] w-full"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8F5EF_42%,#ECE3D6_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(72,109,142,0.16),transparent_34%),radial-gradient(circle_at_50%_72%,rgba(80,65,45,0.10),transparent_32%)]" />
      <div className="absolute bottom-8 h-20 w-72 rounded-full bg-[#7D8FA0]/15 blur-2xl" />

      <Image
        src="/images/head-speed-motion.png"
        alt="HEAD Speed Motion Padel-Schläger"
        width={large ? 520 : 360}
        height={large ? 520 : 360}
        className="relative object-contain mix-blend-multiply contrast-110 drop-shadow-[0_35px_60px_rgba(72,109,142,0.22)]"
        priority
      />
    </motion.div>
  );
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  return (
    <div className="rounded-[24px] border border-[#E1D7CA] bg-[#F7F0E6] p-4 transition hover:bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#73808C]">{product.brand}</div>
          <div className="mt-1 text-lg font-medium tracking-tight text-[#252A2F]">{product.name}</div>
          <div className="mt-2 text-sm leading-6 text-[#676C72]">{product.fit}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#6E7379]">{product.type}</div>
          <div className="mt-2 text-lg font-semibold text-[#22272C]">{product.price}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={() => onOpen(product)} className="rounded-full bg-[#486D8E] text-white hover:bg-[#3D607F]">
          Details ansehen
        </Button>
        <Button variant="outline" className="rounded-full border-[#D7CDC0] bg-transparent text-[#23272C] hover:bg-[#EFE7DB]">
          Vergleichen
        </Button>
      </div>
    </div>
  );
}

function ProductPage({
  product,
  onBack,
}: {
  product: Product;
  onBack: () => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Button onClick={onBack} variant="outline" className="rounded-full border-[#D7CDC0] bg-transparent text-[#23272C] hover:bg-[#EFE7DB]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>
        <div className="text-sm text-[#70757B]">Produktdetail / {product.brand} / {product.name}</div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Card className="overflow-hidden rounded-[34px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_20px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(72,109,142,0.13),transparent_22%),radial-gradient(circle_at_75%_70%,rgba(72,109,142,0.08),transparent_24%)]" />
            <div className="relative flex min-h-[680px] items-center justify-center bg-[linear-gradient(180deg,#FBF8F3_0%,#F2EBDD_100%)] p-10">
              <RacketVisual large />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[34px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_20px_60px_rgba(60,50,30,0.05)]">
            <CardContent className="p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.24em] text-[#73808C]">{product.brand}</div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full border border-[#D8CCBE] bg-[#F7F0E6] px-3 py-1.5 text-[#53585E]">{product.type}</span>
                <span className="rounded-full border border-[#D8CCBE] bg-[#F7F0E6] px-3 py-1.5 text-[#53585E]">{product.level}</span>
              </div>

              <p className="mt-6 text-base leading-7 text-[#666B71]">{product.description}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["Gewicht", product.weight],
                  ["Balance", product.balance],
                  ["Form", product.shape],
                  ["Geeignet für", product.level],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[22px] border border-[#E1D7CA] bg-[#F7F0E6] p-4">
                    <div className="text-sm text-[#6E7379]">{label}</div>
                    <div className="mt-1 text-base font-medium text-[#252A2F]">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[26px] border border-[#D9CEBF] bg-[#F5EEE4] p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-[#6E7379]">Preis</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight text-[#22272C]">{product.price}</div>
                  </div>
                  <div className="rounded-full border border-[#D8CCBE] bg-[#FBF8F3] px-4 py-2 text-sm text-[#596068]">
                    Auf Lager
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-[#D8CCBE] bg-[#FBF8F3]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-[#495059] transition hover:bg-[#F2EBDD]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="min-w-[44px] text-center text-sm font-medium text-[#23282D]">{quantity}</div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-[#495059] transition hover:bg-[#F2EBDD]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button className="h-12 flex-1 rounded-full bg-[#1F2328] text-white hover:bg-[#13171A]">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    In den Warenkorb
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-[#252A2F]">Warum dieser Schläger überzeugt</div>
              <div className="mt-4 space-y-3">
                {product.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[18px] border border-[#E2D8CB] bg-[#F6EFE5] p-4">
                    <div className="mt-0.5 text-[#486D8E]">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-sm leading-6 text-[#666B71]">{item}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Performance-Profil</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">So spielt er sich</h2>

            <div className="mt-8 space-y-5">
              {[
                { label: "Power", value: "8.5/10", icon: Gauge },
                { label: "Kontrolle", value: "8/10", icon: Target },
                { label: "Komfort", value: "7.5/10", icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[22px] border border-[#E1D7CA] bg-[#F7F0E6] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECDFCF] text-[#486D8E]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium text-[#252A2F]">{item.label}</div>
                      </div>
                      <div className="text-sm text-[#5B6168]">{item.value}</div>
                    </div>
                    <div className="h-2 rounded-full bg-[#E6DCCD]">
                      <div className={`h-2 rounded-full bg-[#486D8E] ${item.label === "Power" ? "w-[85%]" : item.label === "Kontrolle" ? "w-[80%]" : "w-[75%]"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Spielerprofil</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Für wen passt er?</h2>
            <p className="mt-4 text-[#666B71]">
              Die besten Produktseiten zeigen nicht nur Specs, sondern helfen dem Kunden zu verstehen, ob der Schläger wirklich zum eigenen Spiel passt.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                ["Am besten für", product.level],
                ["Spielstil", product.type],
                ["Empfohlen wenn du suchst", product.fit],
                ["Gesamtgefühl", `${product.balance}e Balance / ${product.shape}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-[#E1D7CA] bg-[#F7F0E6] p-4">
                  <div className="text-sm text-[#6E7379]">{label}</div>
                  <div className="mt-1 text-sm leading-6 text-[#252A2F]">{value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Alternativen vergleichen</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Weitere starke Optionen</h2>
            <div className="mt-7 space-y-4">
              {featuredProducts.filter((item) => item.id !== product.id).slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-[24px] border border-[#E1D7CA] bg-[#F7F0E6] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-[#73808C]">{item.brand}</div>
                      <div className="mt-1 text-lg font-medium tracking-tight text-[#252A2F]">{item.name}</div>
                      <div className="mt-2 text-sm leading-6 text-[#676C72]">{item.fit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#6E7379]">{item.price}</div>
                      <div className="mt-2 text-sm text-[#596068]">{item.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Noch unsicher?</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Nutze den Schläger-Finder</h2>
            <p className="mt-4 text-[#666B71]">
              Wenn du dir noch nicht sicher bist, hilft dir der Finder anhand von Spielniveau, Spielstil und gewünschtem Gefühl zur passenden Empfehlung.
            </p>
            <div className="mt-8 rounded-[24px] border border-[#E1D7CA] bg-[#F7F0E6] p-5">
              <div className="text-sm font-medium text-[#252A2F]">Drei kurze Schritte</div>
              <div className="mt-4 space-y-3">
                {["Wähle dein Niveau", "Wähle deinen Spielstil", "Erhalte eine passende Premium-Empfehlung"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#666B71]">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ECDFCF] text-[#486D8E]">•</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full rounded-full bg-[#486D8E] text-white hover:bg-[#3D607F]">
                Schläger-Finder öffnen
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function HomePage({
  onOpenProduct,
}: {
  onOpenProduct: (product: Product) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    level: "",
    style: "",
    feel: "",
  });

  const currentStep = quizSteps[step];
  const completed = Object.values(answers).every(Boolean);
  const recommendationId = useMemo(() => getRecommendationId(answers), [answers]);
  const recommendation = featuredProducts.find((item) => item.id === recommendationId) || featuredProducts[1];

  const handleAnswer = (value: string) => {
    const nextAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(nextAnswers);
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({ level: "", style: "", feel: "" });
    setStep(0);
  };

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="rounded-[34px] border border-[#DED4C7] bg-[#FBF8F3] p-7 shadow-[0_20px_80px_rgba(60,50,30,0.08)] md:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2D9CD] bg-[#F5EEE4] px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-[#6B7075]">
            <Star className="h-3.5 w-3.5 text-[#486D8E]" />
            Clean Premium Performance
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight md:text-7xl">
            Hochwertige Padel-Auswahl,
            <span className="block text-[#7C8086]">intelligent kuratiert.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#62676D] md:text-lg">
            Versatile-Lab ist für Spieler gemacht, die eine klarere Art suchen, den richtigen Schläger zu finden. Premium-Marken, intelligentere Beratung und ein Store-Erlebnis, das sich vom ersten Scroll hochwertig anfühlt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => onOpenProduct(featuredProducts[1])} className="rounded-full bg-[#1F2328] px-6 text-white hover:bg-[#121518]">
              Schläger finden
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-[#D7CDC0] bg-transparent px-6 text-[#23272C] hover:bg-[#EFE7DB]">
              Kollektionen entdecken
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Premium-Marken", "Kuratiertes Multi-Brand-Sortiment"],
              ["Schläger-Finder", "Geführte Empfehlung in wenigen Schritten"],
              ["Store-Erlebnis", "Luxuriös, clean und nicht überladen"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-[#E0D6C8] bg-[#F7F1E8] p-4">
                <div className="text-sm font-medium text-[#24292F]">{title}</div>
                <div className="mt-1 text-sm leading-6 text-[#6A6F75]">{text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="relative overflow-hidden rounded-[34px] border border-[#DED4C7] bg-[linear-gradient(180deg,#FBF8F3_0%,#F2EBDD_100%)] p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(72,109,142,0.13),transparent_22%),radial-gradient(circle_at_75%_70%,rgba(72,109,142,0.08),transparent_24%)]" />
          <div className="relative flex h-full min-h-[520px] flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#70757B]">
              <span>Ausgewählte Marken</span>
              <span>Head / Nox / Bullpadel</span>
            </div>

            <div className="flex flex-1 items-center justify-center py-8">
              <RacketVisual />
            </div>

            <div className="rounded-[26px] border border-[#DDD2C5] bg-[#FBF8F3]/80 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.24em] text-[#74797F]">Store-Philosophie</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">Eine klarere Art zu wählen.</div>
              <p className="mt-3 text-sm leading-6 text-[#676C72]">
                Premium-Marken, weniger Ablenkung und ein geführter Prozess, der Spielern beim Kauf mehr Sicherheit gibt.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          "HEAD",
          "NOX",
          "Bullpadel",
          "Adidas",
        ].map((brand) => (
          <div key={brand} className="rounded-[24px] border border-[#DED3C5] bg-[#FBF8F3] px-5 py-4 text-center text-sm font-medium text-[#5A5F65] shadow-[0_10px_30px_rgba(60,50,30,0.04)]">
            {brand}
          </div>
        ))}
      </section>

      <section id="collections" className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Card className="rounded-[30px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_50px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Kollektionen</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Sortiert nach deinem Spiel.</h2>
            <p className="mt-4 max-w-xl text-[#666B71]">
              Der Store ist nach echten Spielerbedürfnissen aufgebaut und nicht nach Chaos. Entdecke eine klarere Art zu shoppen – nach Gefühl, Spielstil und Performance-Profil.
            </p>

            <div className="mt-8 space-y-3">
              {productCollections.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-[#E1D7CA] bg-[#F5EEE4] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-lg font-medium tracking-tight text-[#23282D]">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-[#6B7076]">{item.text}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#72879B]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {trustPoints.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-[30px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_50px_rgba(60,50,30,0.05)]">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECDFCF] text-[#486D8E]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#23282D]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#666B71]">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="finder" className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_20px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E0D5C7] bg-[#F5EEE4] px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-[#6F7479]">
              <Waves className="h-3.5 w-3.5 text-[#486D8E]" />
              Schläger-Finder
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Du weißt nicht, welcher Schläger zu dir passt?
            </h2>
            <p className="mt-4 max-w-2xl text-[#666B71]">
              Beantworte ein paar kurze Fragen und lass dir von Versatile-Lab den Schläger empfehlen, der zu deinem Niveau, deinem Spielstil und deinem gewünschten Gefühl passt.
            </p>

            <div className="mt-8 rounded-[28px] border border-[#E0D5C7] bg-[#F7F0E6] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-[#24292F]">Schritt {Math.min(step + 1, 3)} von 3</div>
                  <div className="mt-1 text-sm text-[#6A6F75]">{completed ? "Empfehlung bereit" : currentStep.label}</div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="rounded-full border border-[#D8CCBE] px-4 py-2 text-sm text-[#43484E] transition hover:bg-[#EFE7DB]"
                >
                  Zurücksetzen
                </button>
              </div>

              {!completed ? (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {currentStep.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="rounded-[22px] border border-[#D9CEBF] bg-[#FBF8F3] p-4 text-left transition hover:border-[#486D8E] hover:bg-white"
                    >
                      <div className="text-sm font-medium text-[#252A30]">{option}</div>
                      <div className="mt-1 text-xs text-[#6B7076]">Antippen zum Fortfahren</div>
                    </button>
                  ))}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-[24px] border border-[#D7CCBE] bg-[#FBF8F3] p-5"
                  >
                    <div className="text-xs uppercase tracking-[0.24em] text-[#6D7278]">Empfohlen für dich</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight text-[#20252A]">
                      {recommendation.brand} {recommendation.name}
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#666B71]">
                      Basierend auf deinen Antworten ist dieser Schläger die stärkste Wahl für dein Profil. Er bietet eine sehr gute Balance aus Spielgefühl und Performance für die Art, wie du spielen möchtest.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-[#E0D6C8] bg-[#F5EEE4] p-3">
                        <div className="text-xs text-[#70757B]">Typ</div>
                        <div className="mt-1 text-sm font-medium text-[#252A2F]">{recommendation.type}</div>
                      </div>
                      <div className="rounded-2xl border border-[#E0D6C8] bg-[#F5EEE4] p-3">
                        <div className="text-xs text-[#70757B]">Preis</div>
                        <div className="mt-1 text-sm font-medium text-[#252A2F]">{recommendation.price}</div>
                      </div>
                      <div className="rounded-2xl border border-[#E0D6C8] bg-[#F5EEE4] p-3">
                        <div className="text-xs text-[#70757B]">Warum er passt</div>
                        <div className="mt-1 text-sm font-medium text-[#252A2F]">{recommendation.fit}</div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button onClick={() => onOpenProduct(recommendation)} className="rounded-full bg-[#486D8E] text-white hover:bg-[#3D607F]">
                        Empfehlung ansehen
                      </Button>
                      <Button variant="outline" className="rounded-full border-[#D7CDC0] bg-transparent text-[#23272C] hover:bg-[#EFE7DB]">
                        Alternativen vergleichen
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </CardContent>
        </Card>

        <Card id="featured" className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_20px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Ausgewählte Produkte</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Unsere Highlights</h2>
            <p className="mt-4 text-[#666B71]">
              Ein hochwertiger Store beginnt mit Zurückhaltung. Weniger Produkte, bessere Darstellung und mehr Vertrauen.
            </p>

            <div className="mt-7 space-y-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="about" className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Über Versatile-Lab</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Ein Premium-Kurator für moderne Padel-Spieler.
                </h2>
                <p className="mt-4 text-[#666B71]">
                  Versatile-Lab basiert auf einer einfachen Idee: den Kauf eines Schlägers intelligenter, klarer und hochwertiger zu machen. Weniger Lärm. Bessere Orientierung. Mehr Sicherheit bei der Auswahl.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Klares Editorial-Layout statt klassischem überladenem Sportshop-Look",
                    "Markengeführte Auswahl aus Premium-Schlägern, Taschen und Zubehör",
                    "Geführte Discovery-Tools für sicherere Kaufentscheidungen",
                    "Eine skalierbare Basis für deine spätere eigene Versatile-Lab-Schlägerlinie",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[#E2D8CB] bg-[#F6EFE5] p-4">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#486D8E]" />
                      <div className="text-sm leading-6 text-[#666B71]">{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[340px] border-l border-[#E2D8CB] bg-[linear-gradient(180deg,#F2EBDD_0%,#E7DDD0_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(72,109,142,0.18),transparent_22%),radial-gradient(circle_at_30%_75%,rgba(72,109,142,0.1),transparent_25%)]" />
                <div className="relative flex h-full items-center justify-center p-8">
                  <div className="w-full max-w-sm rounded-[28px] border border-[#D7CCBE] bg-[#FBF8F3]/80 p-5 backdrop-blur-xl">
                    <div className="rounded-[22px] border border-[#E2D8CB] bg-[#F7F0E6] p-5">
                      <div className="mb-8 h-2 w-20 rounded-full bg-[#B4C5D3]" />
                      <div className="space-y-3">
                        <div className="h-10 rounded-[16px] bg-white" />
                        <div className="h-28 rounded-[22px] bg-white" />
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-20 rounded-[18px] bg-white" />
                          <div className="h-20 rounded-[18px] bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-[#DDD2C5] bg-[#FBF8F3] shadow-[0_18px_60px_rgba(60,50,30,0.05)]">
          <CardContent className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-[#757A80]">Newsletter</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Sei beim nächsten Launch dabei.</h2>
            <p className="mt-4 text-[#666B71]">
              Erhalte kuratierte Drops, neue Schläger-Empfehlungen und ausgewählte Produkt-Highlights direkt von Versatile-Lab.
            </p>

            <div className="mt-8 space-y-4">
              <Input
                placeholder="Deine E-Mail-Adresse"
                className="h-12 rounded-2xl border-[#D8CCBE] bg-[#F7F0E6] text-[#23272C] placeholder:text-[#7A7F85]"
              />
              <Button className="h-12 w-full rounded-2xl bg-[#1F2328] text-white hover:bg-[#13171A]">
                Jetzt eintragen
              </Button>
            </div>

            <div className="mt-8 rounded-[24px] border border-[#E1D7CA] bg-[#F5EEE4] p-5">
              <div className="text-sm font-medium text-[#252A2F]">Starke Basis für die Zukunft</div>
              <div className="mt-2 text-sm leading-6 text-[#666B71]">
                Diese Designrichtung funktioniert heute für einen hochwertigen Multi-Brand-Store und später auch für deine eigene Versatile-Lab-Schlägerlinie.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default function VersatileLabStorePrototype() {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts[1]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setView("product");
  };

  return (
    <div className="min-h-screen bg-[#F6F2EB] text-[#1F2328]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-8 lg:px-10">
        <header className="sticky top-4 z-20 mb-6 rounded-full border border-[#DDD3C5] bg-[#F9F5EF]/90 px-4 py-3 backdrop-blur-xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DED2] text-[#486D8E]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <button onClick={() => setView("home")} className="text-left">
                  <div className="text-sm font-semibold tracking-[0.28em] text-[#262A2F]">VERSATILE-LAB</div>
                  <div className="text-xs text-[#6A6E73]">Premium Padel Curation</div>
                </button>
              </div>
            </div>

            <nav className="hidden items-center gap-7 text-sm text-[#555A60] md:flex">
              <button onClick={() => setView("home")} className={`transition hover:text-[#222] ${view === "home" ? "text-[#222]" : ""}`}>Startseite</button>
              <button onClick={() => openProduct(selectedProduct)} className={`transition hover:text-[#222] ${view === "product" ? "text-[#222]" : ""}`}>Produktseite</button>
              <a href="#" className="transition hover:text-[#222]">Kollektionen</a>
              <a href="#" className="transition hover:text-[#222]">Journal</a>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden rounded-full border-[#D7CDC0] bg-transparent text-[#2A2F34] hover:bg-[#EFE7DB] md:inline-flex">
                Suche
              </Button>
              <Button onClick={() => setView(view === "home" ? "product" : "home")} className="rounded-full bg-[#486D8E] text-white hover:bg-[#3D607F]">
                {view === "home" ? "Store öffnen" : "Zurück zur Startseite"}
              </Button>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <HomePage onOpenProduct={openProduct} />
            </motion.div>
          ) : (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <ProductPage product={selectedProduct} onBack={() => setView("home")} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-8 rounded-[30px] border border-[#DED3C5] bg-[#FBF8F3] px-6 py-6 text-sm text-[#666B71] shadow-[0_12px_40px_rgba(60,50,30,0.04)] md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold tracking-[0.22em] text-[#262A2F]">VERSATILE-LAB</div>
              <div className="mt-1">Premium Padel Curation für Spieler, die klarer und sicherer wählen wollen.</div>
            </div>
            <div className="flex flex-wrap gap-5 text-[#72777D]">
              <a href="#" className="hover:text-[#222]">Store</a>
              <a href="#" className="hover:text-[#222]">Schläger-Finder</a>
              <a href="#" className="hover:text-[#222]">Journal</a>
              <a href="#" className="hover:text-[#222]">Kontakt</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
