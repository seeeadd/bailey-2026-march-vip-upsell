'use client';

import { useState, useEffect } from 'react';
import styles from './registration.module.css';

/* ── Inline SVG Components — AC Game World ── */

const TicketSvg = () => (
  <svg className={styles.ticketIcon} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="20" height="16" rx="4" fill="#D4A853" opacity="0.9"/>
    <rect x="1" y="1" width="20" height="16" rx="4" stroke="#fff" strokeWidth="1" opacity="0.4"/>
    <line x1="6" y1="1" x2="6" y2="17" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" opacity="0.3"/>
    <line x1="16" y1="1" x2="16" y2="17" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" opacity="0.3"/>
    <path d="M11 5L12.1 7.8L15 8.2L12.8 10.1L13.5 13L11 11.5L8.5 13L9.2 10.1L7 8.2L9.9 7.8Z" fill="#fff" opacity="0.9"/>
  </svg>
);

const StarSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5L11.1 6.3L16.5 6.9L12.4 10.5L13.5 15.8L9 13.2L4.5 15.8L5.6 10.5L1.5 6.9L6.9 6.3Z" fill="#D4A853"/>
  </svg>
);

const CheckSvg = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="8" fill="#E07A5F"/>
    <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloudSvg = ({ w = 260, h = 60 }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="white" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx={w*0.5} cy={h*0.58} rx={w*0.23} ry={h*0.37}/>
    <ellipse cx={w*0.35} cy={h*0.63} rx={w*0.17} ry={h*0.3}/>
    <ellipse cx={w*0.65} cy={h*0.63} rx={w*0.19} ry={h*0.33}/>
    <ellipse cx={w*0.46} cy={h*0.47} rx={w*0.13} ry={h*0.27}/>
  </svg>
);

const LeafSvg = () => (
  <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 55 C25 55 5 40 5 20 C5 5 20 0 25 2 C30 0 45 5 45 20 C45 40 25 55 25 55Z" fill="#8FBF8F" opacity="0.25"/>
    <path d="M25 50 L25 10" stroke="#8FBF8F" strokeWidth="1" opacity="0.2"/>
    <path d="M25 25 C18 18 10 22 8 28" stroke="#8FBF8F" strokeWidth="0.8" opacity="0.15" fill="none"/>
    <path d="M25 35 C32 28 40 32 42 38" stroke="#8FBF8F" strokeWidth="0.8" opacity="0.15" fill="none"/>
  </svg>
);

const BellSvg = () => (
  <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="10" r="3" fill="#D4A853" opacity="0.4"/>
    <path d="M20 13 L20 18" stroke="#D4A853" strokeWidth="1.5" opacity="0.3"/>
    <path d="M10 35 C10 22 14 18 20 18 C26 18 30 22 30 35 Z" fill="#D4A853" opacity="0.2"/>
    <ellipse cx="20" cy="35" rx="12" ry="3" fill="#D4A853" opacity="0.15"/>
    <circle cx="20" cy="40" r="3" fill="#D4A853" opacity="0.2"/>
  </svg>
);

const SparkleSvg = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4 L20 14 L30 12 L22 18 L28 26 L20 22 L18 32 L16 22 L8 26 L14 18 L6 12 L16 14 Z" fill="#D4A853" opacity="0.2"/>
    <circle cx="18" cy="18" r="2" fill="#D4A853" opacity="0.3"/>
  </svg>
);

const SparkleSmall = ({ style }) => (
  <svg className={styles.sectionSparkle} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L11 8L18 7L12 10L16 16L11 12L10 18L9 12L4 16L8 10L2 7L9 8Z" fill="#D4A853" opacity="0.15"/>
  </svg>
);

const BaIcon = ({ color, type }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
    <circle cx="7" cy="7" r="3" fill={color} opacity={type === 'before' ? 0.25 : 0.3}/>
  </svg>
);


export default function RegistrationPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Countdown timer — March 6, 2026 at 11:00 AM EST
  useEffect(() => {
    const target = new Date('2026-03-06T11:00:00-05:00');
    const tick = () => {
      const now = new Date();
      let diff = target - now;
      if (diff < 0) diff = 0;
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        window.location.href = '/vip';
      }
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const scrollToForm = () => {
    document.getElementById('final-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pad = (n) => String(n).padStart(2, '0');

  const TimerSmall = () => (
    <div className={styles.topBarTimer}>
      <div className={styles.topBarTimerBlock}>
        {pad(countdown.d)}<span className={styles.topBarTimerLabel}>Days</span>
      </div>
      <div className={styles.topBarTimerBlock}>
        {pad(countdown.h)}<span className={styles.topBarTimerLabel}>Hours</span>
      </div>
      <div className={styles.topBarTimerBlock}>
        {pad(countdown.m)}<span className={styles.topBarTimerLabel}>Min</span>
      </div>
      <div className={styles.topBarTimerBlock}>
        {pad(countdown.s)}<span className={styles.topBarTimerLabel}>Sec</span>
      </div>
    </div>
  );

  const TimerLarge = () => (
    <div className={`${styles.timer} ${styles.timerLarge}`}>
      <div className={styles.timerBlock}>
        <span className={styles.timerNum}>{pad(countdown.d)}</span>
        <span className={styles.timerLabel}>Days</span>
      </div>
      <span className={styles.timerSep}>:</span>
      <div className={styles.timerBlock}>
        <span className={styles.timerNum}>{pad(countdown.h)}</span>
        <span className={styles.timerLabel}>Hours</span>
      </div>
      <span className={styles.timerSep}>:</span>
      <div className={styles.timerBlock}>
        <span className={styles.timerNum}>{pad(countdown.m)}</span>
        <span className={styles.timerLabel}>Min</span>
      </div>
      <span className={styles.timerSep}>:</span>
      <div className={styles.timerBlock}>
        <span className={styles.timerNum}>{pad(countdown.s)}</span>
        <span className={styles.timerLabel}>Sec</span>
      </div>
    </div>
  );

  const CtaButton = ({ text, onClick, type, gold, notchBg, sub }) => (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={type === 'submit' && isSubmitting}
      className={`${styles.ctaBtn} ${gold ? styles.ctaBtnGold : ''}`}
      style={notchBg ? { '--notch-bg': notchBg } : undefined}
    >
      <TicketSvg />
      <span>
        {type === 'submit' && isSubmitting ? 'Registering...' : text}
        {sub && <span className={styles.ctaSub}>{sub}</span>}
      </span>
      <span className={styles.ticketNotchRight} style={notchBg ? { background: notchBg } : undefined} />
    </button>
  );

  const RegForm = ({ id }) => (
    <form onSubmit={handleSubmit} className={styles.regForm} id={id}>
      <input type="text" name="name" placeholder="Your First Name..." value={formData.name} onChange={handleChange} required className={styles.regInput} />
      <input type="email" name="email" placeholder="Your Best Email..." value={formData.email} onChange={handleChange} required className={styles.regInput} />
      <div style={{ paddingTop: 8 }}>
        <CtaButton text="Join The Challenge Secrets Masterclass For FREE!" type="submit" gold notchBg="#f5f0e8" />
      </div>
    </form>
  );

  const FiveStars = () => (
    <div className={styles.starsRow}>
      {[...Array(5)].map((_, i) => <StarSvg key={i} />)}
    </div>
  );

  const WaveDivider = ({ fromColor, toColor }) => (
    <div className={styles.waveDivider} style={{ marginTop: -2, background: toColor }}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d="M0 0 L1440 0 L1440 25 Q1200 75 900 45 Q600 15 300 55 Q100 75 0 55 Z" fill={fromColor}/>
      </svg>
    </div>
  );



  return (
    <div className={styles.page}>

      {/* ═══ TOP BAR — Game HUD ═══ */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLive}>
            <span className={styles.topBarLiveDot} />
            <span>LIVE! Join The FREE Challenge</span>
          </div>
          <TimerSmall />
          <button onClick={scrollToForm} className={styles.topBarBtn}>Register Now</button>
        </div>
      </div>

      {/* ═══ SECTION 1: HERO — Game world entry ═══ */}
      <section className={styles.hero}>
        {/* Floating clouds */}
        <CloudSvg w={260} h={60} />
        <div className={`${styles.heroCloud} ${styles.heroCloud1}`}><CloudSvg w={260} h={60} /></div>
        <div className={`${styles.heroCloud} ${styles.heroCloud2}`}><CloudSvg w={200} h={50} /></div>
        <div className={`${styles.heroCloud} ${styles.heroCloud3}`}><CloudSvg w={180} h={45} /></div>

        {/* Twinkling stars */}
        <div className={styles.heroStar} style={{ top: '8%', left: '20%', animationDelay: '0s' }} />
        <div className={styles.heroStar} style={{ top: '15%', right: '25%', animationDelay: '1s', width: 4, height: 4 }} />
        <div className={styles.heroStar} style={{ top: '35%', left: '8%', animationDelay: '2s', width: 5, height: 5 }} />
        <div className={styles.heroStar} style={{ top: '50%', right: '12%', animationDelay: '0.5s' }} />
        <div className={styles.heroStar} style={{ top: '70%', left: '30%', animationDelay: '1.5s', width: 4, height: 4 }} />

        {/* Floating game items */}
        <div className={`${styles.heroItem} ${styles.heroItemLeaf}`}><LeafSvg /></div>
        <div className={`${styles.heroItem} ${styles.heroItemBell}`}><BellSvg /></div>
        <div className={`${styles.heroItem} ${styles.heroItemSparkle}`}><SparkleSvg /></div>

        <div className={styles.heroInner}>
          <div className={styles.heroImageWrap}>
            <div className={styles.heroImage}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Hero Group Photo</span>
            </div>
          </div>

          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>At Last! The "AI Business" Expert Reveals All!</p>
            <h1 className={styles.heroHeadline}>
              The <span className={styles.coral}>ONE</span> Funnel Every Business Needs, <em>Even If You Suck At Marketing!</em>
            </h1>
            <p className={styles.heroSub}>
              <strong>Just 60 Minutes A Day,</strong> Over The Next 3 Days, Bailey Reveals How To Launch, Grow, Or Scale Any Business Using A 'Challenge Funnel'!
            </p>
            <div className={styles.heroLiveBadge}>
              <span className={styles.topBarLiveDot} />
              <span><strong>LIVE!</strong> Join The Challenge For FREE!</span>
            </div>
            <CtaButton
              text="Join The 'Challenge Secrets Masterclass' For Free"
              onClick={scrollToForm}
              gold
              notchBg="#352E28"
              sub="Click Here To Save Your Free Seat Now"
            />
          </div>
        </div>
      </section>

      {/* Wave divider — rolling hills */}
      <WaveDivider fromColor="#352E28" toColor="#ffffff" />

      {/* ═══ SECTION 2: IS THIS FOR ME? ═══ */}
      <section className={`${styles.forMe} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <div className={styles.forMeHeader}>
            <p className={styles.forMeEyebrow}>Is The 'Challenge Secrets Masterclass'</p>
            <h2 className={styles.sectionTitleDark}>For Me And My Business...??</h2>
            <p className={styles.forMeSubtitle}>Yes! This 'Challenge Secrets Masterclass' is especially for you if...</p>
          </div>
          <div className={styles.forMeContent}>
            <div className={styles.forMeImage}>
              <div className={styles.imagePlaceholder} style={{ aspectRatio: '3/4' }}>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Photo Placeholder</span>
              </div>
            </div>
            <div className={styles.forMeText}>
              <ul className={styles.checkList}>
                <li>
                  <CheckSvg />
                  <span><strong>You've tried all the marketing things</strong> like posting free content, blogging, podcasting, lead magnets, and maybe even webinars with little to no results.</span>
                </li>
                <li>
                  <CheckSvg />
                  <span><strong>You're totally new to all of this and suck at marketing.</strong> (Hint: YOU don't "suck"... but maybe the funnel you're using isn't a right fit for your offer and audience...)</span>
                </li>
                <li>
                  <CheckSvg />
                  <span><strong>You want a proven, step-by-step system</strong> that actually works and don't know where to start...</span>
                </li>
                <li>
                  <CheckSvg />
                  <span><strong>You think a challenge funnel wouldn't work for you</strong> because you believe your business is "different"...</span>
                </li>
              </ul>
              <p className={styles.forMeBottom}>
                If you nodded or said <strong>"yes"</strong> to any of the above, then <span className={styles.forMeYes}>YES</span>, this FREE 3-Day Challenge Secrets Masterclass is 100% for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: SIGN UP TODAY — Glowing quest portal ═══ */}
      <section className={`${styles.signUp} ${styles.sectionOverlap}`} id="signup-form">
        {/* Floating decorative items */}
        <svg className={`${styles.floatItem} ${styles.floatItem1}`} width="60" height="70" viewBox="0 0 60 70" fill="none">
          <path d="M30 65 C30 65 5 48 5 25 C5 6 22 0 30 3 C38 0 55 6 55 25 C55 48 30 65 30 65Z" fill="#1D6B6B" opacity="0.06"/>
          <path d="M30 58 L30 8" stroke="#1D6B6B" strokeWidth="1" opacity="0.08"/>
        </svg>
        <svg className={`${styles.floatItem} ${styles.floatItem2}`} width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M22 4 L24 18 L38 16 L26 22 L34 34 L24 28 L22 40 L20 28 L10 34 L18 22 L6 16 L20 18 Z" fill="#D4A853" opacity="0.1"/>
          <circle cx="22" cy="22" r="3" fill="#D4A853" opacity="0.12"/>
        </svg>

        <div className={styles.sectionInnerNarrow} style={{ position: 'relative', zIndex: 2 }}>
          <h2 className={styles.sectionTitleDark}>Sign Up Today...</h2>
          <p className={styles.signUpSub}>
            I can't wait for you to see the secrets to creating, launching and profiting from Challenge
            Funnels! All it takes is your name and email.
          </p>

          {/* Quest badge */}
          <div className={styles.questBadge}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L11.5 6.5L17 7.2L13 11L14 16.5L9 13.8L4 16.5L5 11L1 7.2L6.5 6.5Z" fill="#D4A853"/></svg>
            Start Your Quest — Step 1 of 1
          </div>

          <div className={styles.formGlow}>
            <RegForm />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: ONCE IN A LIFETIME MASTERCLASS ═══ */}
      <section className={`${styles.masterclass} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <div style={{ textAlign: 'center' }}>
            <p className={styles.masterclassEyebrow}>Unlock The Potential That's Already Waiting for You In This</p>
            <h2 className={styles.sectionTitleDark}>Once-In-A-Lifetime <span className={styles.coral}>Masterclass!</span></h2>
          </div>

          <div className={styles.masterclassGrid}>
            <div className={styles.masterclassImages}>
              {[1, 2, 3].map(n => (
                <div key={n} className={styles.masterclassImg}>
                  <div className={styles.imagePlaceholder} style={{ aspectRatio: '4/3' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Photo {n}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.masterclassBody}>
              <p>From building a thriving digital business to helping over <strong>100,000 entrepreneurs</strong> launch their AI-powered income streams.</p>
              <p>Bailey has cracked the code on what it truly takes to build a profitable business fast — and she's distilled it all into this <strong>completely FREE</strong> 3-Day Masterclass.</p>
              <blockquote className={styles.quote}>
                "I've helped people just like YOU start and scale 6 and 7-figure businesses using <strong>Challenge Funnels</strong> — and now I want to show you exactly how."
              </blockquote>
              <p className={styles.credentials}>
                <strong>Bailey Vann</strong> — Featured entrepreneur, digital business strategist, and creator of the AI Design & Grow Experience.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className={styles.masterclassNote}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="#D4A853" opacity="0.6"/></svg>
              Also attend and get access to the biggest <strong>bonus challenge training</strong> of the year at the end of the 3 days!
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: CTA BANNER — Quest checkpoint ═══ */}
      <section className={`${styles.blueBanner} ${styles.sectionOverlap}`}>
        {/* Floating sparkles */}
        <SparkleSmall style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <SparkleSmall style={{ top: '30%', right: '15%', animationDelay: '1.5s' }} />

        <div className={styles.sectionInnerNarrow} style={{ position: 'relative', zIndex: 2 }}>
          <p className={styles.blueBannerEyebrow}>Join Us For A Brand New Exclusive</p>
          <h2 className={styles.blueBannerTitle}>FREE <span className={styles.coral}>Challenge Secrets</span> Masterclass!</h2>
          <CtaButton text="Join The Challenge Secrets Masterclass For FREE!" onClick={scrollToForm} gold notchBg="#1a1816" />
        </div>
      </section>

      {/* ═══ SECTION 6: 3-DAY BREAKDOWN — Quest levels ═══ */}
      <section className={`${styles.days} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          {/* Animated sparkle */}
          <svg className={styles.daysSparkle} width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 4 L24 18 L38 16 L26 22 L34 34 L24 28 L22 40 L20 28 L10 34 L18 22 L6 16 L20 18 Z" fill="#D4A853" opacity="0.15"/>
            <circle cx="22" cy="22" r="3" fill="#D4A853" opacity="0.2"/>
          </svg>

          <p className={styles.daysEyebrow}>3-Day Masterclass Breakdown</p>
          <h2 className={styles.sectionTitleDark}>
            Here's What You Can Expect From <span className={styles.coral}>The 3-Day Challenge...</span>
          </h2>

          <div className={styles.daysCardsWrap}>
            {[
              { day: 'DAY 1', title: 'What Is A "Challenge Funnel?"', desc: 'Discover why challenge funnels are the #1 funnel type for building authority, generating leads, and converting customers — even in crowded markets.', dotClass: '' },
              { day: 'DAY 2', title: 'Irresistible Challenge Offers', desc: 'Learn how to craft an offer so compelling that people feel STUPID saying no. We\'ll break down the anatomy of irresistible offers.', dotClass: styles.dayDot2 },
              { day: 'DAY 3', title: 'Creating An Irresistible Challenge', desc: 'The step-by-step blueprint for designing your challenge content, structure, and delivery. You\'ll map out your entire challenge.', dotClass: styles.dayDot3 },
            ].map((item, i) => (
              <div key={i} className={styles.dayCardWrap}>
                <div className={`${styles.dayDot} ${item.dotClass}`} />
                <div className={styles.dayCard}>
                  <div className={styles.dayCardLeft}>
                    <div className={styles.imagePlaceholderDay}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <span>Video</span>
                    </div>
                  </div>
                  <div className={styles.dayCardRight}>
                    <span className={styles.dayLabel}>{item.day}</span>
                    <h3 className={styles.dayTitle}>{item.title}</h3>
                    <p className={styles.dayDesc}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Bonus */}
            <div className={styles.dayCardWrap}>
              <div className={`${styles.dayDot} ${styles.dayDotBonus}`} />
              <div className={styles.dayCard}>
                <div className={styles.dayCardLeft}>
                  <div className={styles.imagePlaceholderDay}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <span>Video</span>
                  </div>
                </div>
                <div className={styles.dayCardRight}>
                  <span className={`${styles.dayLabel} ${styles.dayLabelBonus}`}>BONUS</span>
                  <h3 className={styles.dayTitle}>Crush It With Challenges</h3>
                  <p className={styles.dayDesc}>
                    An exclusive bonus session with advanced challenge strategies, Q&A, and live hot-seat
                    coaching to help you launch YOUR challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA button at bottom of day breakdown */}
          <div className={styles.daysCta}>
            <CtaButton text="Join Challenge Secrets For FREE!" onClick={scrollToForm} gold notchBg="#ffffff" />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: URGENCY — Photo, stars, timer, spots bar ═══ */}
      <section className={`${styles.urgency} ${styles.sectionOverlap}`}>
        <div className={styles.urgencyCard}>
          {/* Bouncing arrow */}
          <svg className={styles.urgencyBob} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 5 C25 5 24 30 25 38" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
            <path d="M18 32 L25 42 L32 32" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
          </svg>

          <h2 className={styles.sectionTitleDark}>But Hurry! We're <span className={styles.coral}>Filling Up Fast...</span></h2>

          {/* Photo placeholder */}
          <div className={styles.urgencyImageWrap}>
            <div className={styles.imagePlaceholder} style={{ aspectRatio: '16/9' }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Photo Placeholder</span>
            </div>
          </div>

          {/* 5 Stars */}
          <FiveStars />

          {/* Large countdown timer */}
          <div className={styles.urgencyTimerWrap}>
            <TimerLarge />
          </div>

          {/* Spots remaining bar */}
          <div className={styles.spotsBar}>
            <div className={styles.spotsBarFill} />
          </div>
          <p className={styles.spotsBarText}>73% of spots claimed!</p>

          <p className={styles.urgencySub}>
            We cap registration to keep the experience intimate and high-impact. Once spots are gone,
            you'll have to wait for the next round.
          </p>

          <div className={styles.urgencyChevrons}>
            <span>▼</span><span>▼</span><span>▼</span>
          </div>

          <CtaButton text="Join Challenge Secrets For FREE!" onClick={scrollToForm} gold notchBg="#ffffff" />
        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider fromColor="#f5f0e8" toColor="#1a1816" />

      {/* ═══ SECTION 8: YOUR HOSTS — Villager cards ═══ */}
      <section className={`${styles.hosts} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <p className={styles.hostsEyebrow}>Your Hosts Serving This</p>
          <h2 className={styles.sectionTitle}>3-Day Challenge Secrets <span className={styles.coral}>Masterclass!</span></h2>

          <div className={styles.hostsGrid}>
            {[
              { name: 'Bailey Vann', role: 'AI Business Strategist & Challenge Expert', bio: 'She\'s helped thousands of entrepreneurs build thriving digital businesses using AI-powered challenge funnels.', tag: 'Video' },
              { name: 'Guest Expert', role: 'Special Guest Presenter', bio: 'A renowned industry leader joining Bailey to share exclusive strategies and behind-the-scenes tactics.', tag: 'Featured' },
            ].map((item, i) => (
              <div key={i} className={styles.hostCard}>
                <div className={styles.hostAvatar}>
                  <div className={styles.hostAvatarInner}>{item.name.charAt(0)}</div>
                </div>
                <span className={styles.hostTag}>{item.tag}</span>
                <h3 className={styles.hostName}>{item.name}</h3>
                <p className={styles.hostRole}>{item.role}</p>
                <p className={styles.hostBio}>{item.bio}</p>
              </div>
            ))}
          </div>

          {/* Will You Take It? */}
          <div className={styles.willYou}>
            <p className={styles.willYouSub}>Your Chance To Achieve The Online Sales You've Always Wanted Is Right Here...</p>
            <h2 className={styles.sectionTitle}><span className={styles.yellow}>Will</span> You Take It?</h2>
            <CtaButton text="Join Challenge Secrets For FREE!" onClick={scrollToForm} gold notchBg="#1a1816" />
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider fromColor="#1a1816" toColor="#ffffff" />

      {/* ═══ SECTION 9: SOCIAL PROOF ═══ */}
      <section className={`${styles.socialProof} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <p className={styles.socialEyebrow}>What Folks Are Saying About</p>
          <h2 className={styles.sectionTitleDark}>Bailey's <span className={styles.coral}>Challenges!</span></h2>

          <div className={styles.socialGrid}>
            {[
              { name: 'Sarah M.', text: 'I went from zero online presence to a $47K launch in 30 days using what I learned in the challenge.' },
              { name: 'Marcus T.', text: 'This completely changed how I think about selling. The framework made it feel natural and fun.' },
              { name: 'Jennifer K.', text: 'By Day 2 I had my entire challenge mapped out. By Day 3 I had my first 200 signups.' },
              { name: 'David L.', text: 'The amount of actionable value in this FREE masterclass is insane. Better than $2K courses.' },
              { name: 'Amanda R.', text: 'As a complete beginner, I was nervous. But the step-by-step approach made everything click.' },
              { name: 'Chris P.', text: 'We added challenge funnels to our agency. It\'s now our highest-revenue offer.' },
            ].map((item, i) => (
              <div key={i} className={styles.socialCard}>
                <div className={styles.socialAvatar}>{item.name.charAt(0)}</div>
                <div className={styles.socialStars}>
                  {[...Array(5)].map((_, j) => <StarSvg key={j} />)}
                </div>
                <p className={styles.socialText}>"{item.text}"</p>
                <p className={styles.socialName}>— {item.name}</p>
              </div>
            ))}
          </div>

          <div className={styles.socialCta}>
            <CtaButton text="Join Challenge Secrets For FREE!" onClick={scrollToForm} gold notchBg="#ffffff" />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: BEFORE / AFTER ═══ */}
      <section className={`${styles.beforeAfter} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>
            What You Can Expect From The <span className={styles.coral}>'Challenge Secrets' Masterclass?</span>
          </h2>

          <div className={styles.baGrid}>
            <div className={`${styles.baCol} ${styles.baColBefore}`}>
              <div className={styles.baHeader}>
                <span className={styles.baLabelRed}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }}><path d="M4 4L12 12M12 4L4 12" stroke="#E07A5F" strokeWidth="2.2" strokeLinecap="round"/></svg>
                  BEFORE The Challenge
                </span>
              </div>
              <ul className={styles.baList}>
                {['Confused about what funnel to build','Struggling to get leads and sales','Overwhelmed by all the marketing noise','No clear path to consistent revenue','Spending money on ads with no ROI'].map((item, i) => (
                  <li key={i}><BaIcon color="#E07A5F" type="before" />{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.baCol} ${styles.baColAfter}`}>
              <div className={styles.baHeader}>
                <span className={styles.baLabelGreen}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }}><path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#2A8A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  AFTER The Challenge
                </span>
              </div>
              <ul className={styles.baList}>
                {['Crystal-clear challenge funnel mapped out','A proven system to attract ideal clients','Confidence to launch and sell authentically','A repeatable revenue engine','A community of like-minded entrepreneurs'].map((item, i) => (
                  <li key={i}><BaIcon color="#2A8A8A" type="after" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: EVERYTHING YOU GET ═══ */}
      <section className={`${styles.everything} ${styles.sectionOverlap}`} id="final-form">
        <div className={styles.sectionInnerNarrow}>
          <p className={styles.everythingEyebrow}>Here's Everything You Get When You Sign Up For</p>
          <h2 className={styles.sectionTitleDark}>
            The <span className={styles.coral}>'Challenge Secrets Masterclass'</span> Today!
          </h2>

          <div className={styles.everythingProduct}>
            <div className={`${styles.imagePlaceholder} ${styles.everythingProductImg}`}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="0.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Product Mockup — Devices, Toolkit, FB Group</span>
            </div>

            <div className={styles.valueStack}>
              <div className={styles.valueRow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}><path d="M4 8H12M12 8L8.5 4.5M12 8L8.5 11.5" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span><strong>FREE!</strong> 3 days of learning on how to build, grow, or scale any business using Challenge Funnels! <span className={styles.valueAmt}>($1,995 Value)</span></span>
              </div>
              <div className={styles.valueRow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}><path d="M4 8H12M12 8L8.5 4.5M12 8L8.5 11.5" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span><strong>FREE!</strong> Access to our private 'Challenge Secrets Masterclass' Facebook group! <span className={styles.valueAmt}>(PRICELESS!)</span></span>
              </div>
              <div className={styles.valueRow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}><path d="M4 8H12M12 8L8.5 4.5M12 8L8.5 11.5" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span><strong>FREE!</strong> The single greatest funnel-building "toolkit" to help maximize your challenges! <span className={styles.valueAmt}>($995 Value)</span></span>
              </div>
            </div>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.priceLabel}>Normally: <span className={styles.priceStrike}>$2,997</span></p>
            <p className={styles.priceFinal}>Today's Price: <span className={styles.priceFree}>100% FREE!</span></p>
          </div>

          <CtaButton
            text="YES, I Want To Join Challenge Secrets For FREE"
            onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
            gold
            notchBg="#ffffff"
            sub="$2,997 Value. 100% FREE"
          />
        </div>
      </section>

      {/* ═══ WHAT / WHEN / WHY ═══ */}
      <section className={`${styles.wwwSection} ${styles.sectionOverlap}`}>
        <div className={styles.sectionInner}>
          <div className={styles.wwwGrid}>
            <div className={styles.wwwCol}>
              <h3 className={styles.wwwLabel}>WHAT</h3>
              <p className={styles.wwwText}>3-Day Virtual Event: 'Challenge Secrets Masterclass'</p>
            </div>
            <div className={styles.wwwCol}>
              <h3 className={styles.wwwLabel}>WHEN</h3>
              <p className={styles.wwwText}>Starting Soon @ 11 AM EST<br/>(60 minutes per challenge day)</p>
            </div>
            <div className={styles.wwwCol}>
              <h3 className={styles.wwwLabel}>WHY</h3>
              <p className={styles.wwwText}>So you can finally have the life and business you want, without the needless hassles of traditional online marketing!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL DARK BANNER — Boss level CTA ═══ */}
      <section className={`${styles.finalBanner} ${styles.sectionOverlap}`}>
        <div className={styles.finalBannerInner}>
          <div>
            <div className={styles.imagePlaceholderLight} style={{ width: '100%', aspectRatio: '4/3' }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Product Mockup + Toolkit</span>
            </div>
          </div>
          <div>
            <p className={styles.finalBannerEyebrow}>Now's The Time To Get Off The Sidelines And Get In The Game...</p>
            <h2 className={styles.finalBannerTitle}>Join 'The Challenge Secrets <span className={styles.coral}>Masterclass'</span> Today!</h2>
            <CtaButton
              text="Join Challenge Secrets For FREE!"
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              gold
              notchBg="#1a1816"
              sub="Click Here To Save Your Free Seat Now"
            />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={styles.footer}>
        <div className={styles.sectionInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerBrandName}>CHALLENGE <span className={styles.footerBrandSpan}>SECRETS</span></span>
            <span className={styles.footerBrandSub}>Masterclass</span>
          </div>
          <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Bailey Vann Education. All Rights Reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy</a>
            <a href="#">DMCA Policy</a>
            <a href="#">Income Disclosure</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
