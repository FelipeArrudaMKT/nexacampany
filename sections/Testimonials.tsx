
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const STATS = [
  { label: 'Corpos Transformados', value: '6000+' },
  { label: 'Avaliação Média', value: '4.9/5' },
  { label: 'Dos Clientes Satisfeitos', value: '99,4%' },
  { label: 'Entrega Rápida', value: '24h' },
];

const CAROUSEL_IMAGES = [
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/img_0136%20(1).png',
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/img_0136%20(2).png',
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/img_0136.png'
];

const AUDIO_TESTIMONIALS = [
  {
    url: 'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/whatsapp-ptt-2025-09-26-at-133209_FE27ms8v.ogg',
    duration: '0:12'
  },
  {
    url: 'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/whatsapp-ptt-2025-09-26-at-190942_XadTJDP8.ogg',
    duration: '0:15'
  }
];

const AudioCard: React.FC<{ url: string; duration: string }> = ({ url, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-emerald-50 rounded-2xl p-6 flex items-center gap-4 border border-emerald-100 shadow-sm">
      <audio ref={audioRef} src={url} onEnded={() => setIsPlaying(false)} />
      <button 
        onClick={togglePlay}
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg active:scale-95"
      >
        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
      </button>
      <div className="flex-1">
        <div className="flex gap-0.5 mb-2 h-8 items-end">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full bg-emerald-300 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{ height: `${20 + Math.random() * 60}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-emerald-600 font-bold uppercase tracking-wider">
          <span>{isPlaying ? 'Reproduzindo' : 'Mensagem de Áudio'}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          O Que Nossos <span className="text-purple-600">Clientes Dizem</span>
        </h2>
        <p className="text-gray-500 text-lg">Mais de 6000 clientes já transformaram o corpo e a autoestima! Veja alguns depoimentos reais.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {AUDIO_TESTIMONIALS.map((audio, i) => (
          <AudioCard key={i} url={audio.url} duration={audio.duration} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-purple-600 mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto px-4 relative">
        <div className="bg-gray-100 rounded-[3.5rem] p-6 shadow-2xl border border-gray-200 overflow-hidden group">
          <div className="relative aspect-[9/16] w-full max-w-[400px] mx-auto overflow-hidden rounded-[2.5rem] bg-white">
            {CAROUSEL_IMAGES.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110'
                }`}
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover shadow-inner"
                  alt={`Depoimento ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full md:-translate-x-20 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all z-20 hover:scale-110 active:scale-95 border border-gray-100"
          aria-label="Anterior"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full md:translate-x-20 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all z-20 hover:scale-110 active:scale-95 border border-gray-100"
          aria-label="Próximo"
        >
          <ChevronRight size={28} />
        </button>
        
        <div className="flex justify-center gap-2 mt-10">
           {CAROUSEL_IMAGES.map((_, index) => (
             <button 
               key={index}
               onClick={() => setCurrentIndex(index)}
               className={`h-2.5 rounded-full transition-all duration-300 ${
                 index === currentIndex ? 'bg-purple-600 w-10 shadow-sm' : 'bg-gray-300 w-2.5 hover:bg-gray-400'
               }`}
             ></button>
           ))}
        </div>
      </div>
    </section>
  );
};
