import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать хотя бы 2 символа.",
  }),
  company: z.string().min(2, {
    message: "Название компании должно содержать хотя бы 2 символа.",
  }),
  email: z.string().email({
    message: "Укажите корректный email.",
  }),
  phone: z.string().optional(),
});

export function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    // Auto-close after some time if needed, or keep it open
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 flex flex-col items-center justify-center text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold uppercase tracking-tight">Отправлено</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
            Благодарим за интерес к нашим продуктам! Мы с Вами свяжемся в ближайшее время
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={onSuccess}
          className="mt-4 rounded-none border-foreground/20 uppercase tracking-widest text-[10px]"
        >
          Закрыть
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">ФИО</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} className="bg-background/50 border-border/50 focus-visible:ring-foreground/20 h-10 md:h-11 rounded-none text-sm" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Название компании</FormLabel>
              <FormControl>
                <Input placeholder="ООО 'Терра'" {...field} className="bg-background/50 border-border/50 focus-visible:ring-foreground/20 h-10 md:h-11 rounded-none text-sm" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Email (Обязательно)</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} className="bg-background/50 border-border/50 focus-visible:ring-foreground/20 h-10 md:h-11 rounded-none text-sm" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Телефон (По желанию)</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 000-00-00" {...field} className="bg-background/50 border-border/50 focus-visible:ring-foreground/20 h-10 md:h-11 rounded-none text-sm" />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-11 md:h-12 uppercase tracking-widest text-[11px] font-bold mt-2"
        >
          Отправить заявку
        </Button>
      </form>
    </Form>
  );
}
