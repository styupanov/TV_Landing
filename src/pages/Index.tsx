import { motion } from "framer-motion";
import InteractiveGrid from "@/components/InteractiveGrid";

const Index = () => {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden leading-tight">
      {/* Hero — large centered name + interactive grid */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-0">
        {/* Interactive grid background */}
        <div className="absolute inset-0">
          <InteractiveGrid />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 pointer-events-none px-4 py-2 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-center shrink-0"
          >
            <div className="relative flex items-center gap-3 md:gap-8 w-full max-w-7xl mx-auto">
              <div className="flex-1 text-right">
                <h1 className="text-[clamp(1.8rem,8vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase text-black inline-block">
                  Terra
                  <br />
                  Vista
                </h1>
              </div>
              {/* Invisible spacer to maintain layout */}
              <div className="w-[1px] md:w-[2px] self-stretch invisible shrink-0" />
              <div className="flex-1 text-left">
                <p
                  className="text-[clamp(1.8rem,8vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase text-black/15 select-none inline-block"
                  aria-hidden="true"
                >
                  Терра
                  <br />
                  Виста
                </p>
              </div>
              {/* Absolute centered separator line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] md:w-[2px] bg-black/10 -translate-x-1/2" />
            </div>
          </motion.div>

          <div className="mt-4 md:mt-8 text-center relative z-10 max-w-2xl px-4 shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-[clamp(0.9rem,1.5vw,1.3rem)] font-bold leading-[1.2] mb-2 md:mb-4 text-black"
            >
              Город как данные. Данные как основа решений.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-[11px] md:text-[14px] text-black/60 font-medium leading-relaxed mx-auto max-w-sm"
            >
              Terra Vista — на стыке технологий, аналитики и градостроительной экспертизы. 
              Мы создаём цифровые продукты для девелоперов, инвесторов и институтов развития территорий.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contacts Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="border-t border-black/10 bg-transparent relative z-10 shrink-0"
      >
        <div className="grid grid-cols-2 divide-x-[0.5px] divide-black/10">
          <div className="px-2 md:px-12 py-3 md:py-6 flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <p className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 font-bold">EMAIL</p>
            <p className="text-[10px] md:text-[14px] font-bold text-black truncate w-full">office@terra-vista.ru</p>
          </div>
          <div className="px-2 md:px-12 py-3 md:py-6 flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 font-bold">ГОРОД</p>
            <p className="text-[10px] md:text-[14px] font-bold text-black">Москва</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="border-t border-black/10 px-4 md:px-12 py-2 md:py-4 shrink-0 bg-transparent"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[7px] md:text-[9px] text-black/30 font-medium">
          <p className="max-w-2xl leading-tight">
            ИП Ганжинова Софья Андреевна · ОГРНИП: 123456789101112 · ИНН: 123456789101 · 
            Информация на сайте носит ознакомительный характер и не является публичной офертой.
          </p>
          <p className="whitespace-nowrap self-end md:self-auto opacity-50">© 2026</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
