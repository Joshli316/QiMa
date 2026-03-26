import { t, getLanguage } from '../i18n.js';

// ============================================
// CodeLaunch — Career Corner Component
// ============================================

const stats = [
  {
    number: '543%',
    desc: { zh: 'AI 岗位需求同比增长', en: 'AI job demand growth YoY' },
    source: { zh: '来源: LinkedIn 2025 新兴岗位报告', en: 'Source: LinkedIn 2025 Emerging Jobs Report' },
  },
  {
    number: '$95K-145K',
    desc: { zh: 'AI 相关岗位平均起薪', en: 'Average AI-related starting salary' },
    source: { zh: '来源: Glassdoor 薪资调查 2025', en: 'Source: Glassdoor Salary Survey 2025' },
  },
  {
    number: '78%',
    desc: { zh: '科技公司现在要求 AI 技能', en: 'Of tech companies now require AI familiarity' },
    source: { zh: '来源: Stack Overflow 开发者调查', en: 'Source: Stack Overflow Developer Survey' },
  },
  {
    number: '3x',
    desc: { zh: '使用 AI 工具后原型开发提速', en: 'Faster to prototype with AI tools' },
    source: { zh: '来源: GitHub Copilot 影响力研究', en: 'Source: GitHub Copilot Impact Study' },
  },
];

const articles = [
  {
    icon: '🛂',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    title: { zh: 'H-1B签证与AI技能', en: 'H-1B Visa & AI Skills' },
    preview: {
      zh: 'AI 技能如何让你的签证申请更有竞争力？雇主更愿意为掌握 AI 的候选人担保 H-1B。',
      en: 'How do AI skills strengthen your visa application? Employers are more willing to sponsor H-1B for candidates with AI proficiency.',
    },
    full: {
      zh: `在 H-1B 签证申请中，"specialty occupation"（专业职业）是关键。掌握 AI 辅助开发工具表明你具备前沿技术能力，这正是移民局希望看到的。

具体优势：
• AI 相关岗位通常满足"高薪资"门槛，在 H-1B 抽签中可能获得优先
• 你的项目作品集能直观展示你的技术实力，强化雇主的担保意愿
• 掌握 Claude Code 等工具意味着你能快速上手，降低雇主培训成本

建议：在简历和面试中，清楚说明你如何使用 AI 工具构建了真实项目，而不仅仅是"了解 AI"。`,
      en: `In H-1B visa applications, demonstrating "specialty occupation" skills is critical. Proficiency in AI-assisted development tools signals cutting-edge capabilities that USCIS values.

Key advantages:
• AI-related roles typically meet higher salary thresholds, potentially gaining priority in H-1B lottery
• Your portfolio of shipped projects visually demonstrates technical competence, strengthening employer sponsorship cases
• Mastery of tools like Claude Code shows you can ramp up quickly, reducing employer training costs

Tip: In your resume and interviews, clearly articulate HOW you used AI tools to build real projects — don't just say "familiar with AI."`,
    },
  },
  {
    icon: '📄',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    title: { zh: '简历上的AI项目', en: 'AI Projects on Your Resume' },
    preview: {
      zh: '如何在简历上展示你用 Claude Code 构建的项目？让招聘官一眼看到你的 AI 实战能力。',
      en: 'How to showcase Claude Code projects on your resume? Make recruiters immediately see your hands-on AI capabilities.',
    },
    full: {
      zh: `简历上展示 AI 项目的黄金法则：量化、具体、有成果。

推荐写法：
• "使用 Claude Code（AI 辅助开发）独立构建并部署了 3 个全栈 Web 应用，开发周期缩短 70%"
• "通过 AI 驱动的开发流程，在 2 周内从零基础到发布可用产品"
• "利用 AI 结对编程完成了包含用户认证、数据库和 API 集成的完整项目"

避免的写法：
• "会用 ChatGPT" — 太模糊
• "AI 生成代码" — 听起来像你不理解代码
• "熟悉 AI 工具" — 没有任何证据支撑

关键：附上你部署的项目链接（Cloudflare Pages 链接）和 GitHub 仓库，让面试官可以直接查看你的代码。`,
      en: `The golden rule for AI projects on your resume: quantify, be specific, show outcomes.

Recommended phrasing:
• "Independently built and deployed 3 full-stack web apps using Claude Code (AI-assisted development), reducing development cycle by 70%"
• "Went from zero coding experience to shipping production-ready products in 2 weeks through AI-driven development"
• "Completed full projects with user auth, database, and API integration using AI pair programming"

Avoid:
• "Can use ChatGPT" — too vague
• "AI-generated code" — sounds like you don't understand the code
• "Familiar with AI tools" — no evidence to back it up

Key: Include links to your deployed projects (Cloudflare Pages URLs) and GitHub repos so interviewers can review your actual code.`,
    },
  },
  {
    icon: '🎤',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    title: { zh: '面试中展示AI能力', en: 'Demonstrating AI in Interviews' },
    preview: {
      zh: '技术面试中如何展示你的 AI 辅助开发技能？学会讲述你的 AI 协作故事。',
      en: 'How to demonstrate AI-assisted development in technical interviews? Learn to tell your AI collaboration story.',
    },
    full: {
      zh: `面试中展示 AI 能力的核心策略：展示你是"指挥家"而非"复制粘贴者"。

面试官想听到的：
• 你如何分解复杂问题，然后用 AI 工具逐步解决
• 你如何审查和改进 AI 生成的代码
• 你如何处理 AI 犯错的情况（这很重要！）
• 你对代码质量的理解，而不仅仅是"能跑就行"

实用技巧：
1. 准备 2-3 个"AI 协作故事"：描述一个你用 AI 解决的实际挑战
2. 能够解释你项目中每一行代码的作用
3. 展示你的 debugging 能力——AI 不是万能的
4. 强调你在 AI 辅助下的学习速度和适应能力

加分项：现场演示你如何使用 Claude Code 快速解决一个小问题。`,
      en: `Core strategy for demonstrating AI skills in interviews: Show you're the "conductor," not the "copy-paster."

What interviewers want to hear:
• How you decompose complex problems and use AI tools to solve them step by step
• How you review and improve AI-generated code
• How you handle situations where AI makes mistakes (this is important!)
• Your understanding of code quality beyond "it works"

Practical tips:
1. Prepare 2-3 "AI collaboration stories": describe a real challenge you solved with AI
2. Be able to explain what every line in your projects does
3. Show your debugging skills — AI isn't perfect
4. Emphasize your learning speed and adaptability with AI assistance

Bonus: Live-demo how you use Claude Code to quickly solve a small problem on the spot.`,
    },
  },
];

const interviewQA = [
  {
    q: { zh: '请介绍一下你使用 AI 工具的经验', en: 'Tell me about your experience with AI tools' },
    a: {
      zh: '我使用 Claude Code 完成了从零到部署的多个 Web 项目。在这个过程中，我学会了如何有效地与 AI 协作：明确描述需求、分步推进开发、审查生成的代码、并独立调试问题。AI 不是替代我思考，而是加速了我的学习和开发过程。我可以展示我部署在 Cloudflare Pages 上的几个项目作为例证。',
      en: 'I used Claude Code to build and deploy multiple web projects from scratch. Through this process, I learned how to collaborate effectively with AI: clearly describing requirements, progressing development step by step, reviewing generated code, and debugging independently. AI doesn\'t replace my thinking — it accelerates my learning and development. I can show you several projects I\'ve deployed on Cloudflare Pages as evidence.',
    },
  },
  {
    q: { zh: '你是如何构建你的作品集项目的？', en: 'How did you build your portfolio projects?' },
    a: {
      zh: '每个项目我都从需求分析开始：确定目标用户、核心功能和技术栈。然后我使用 Claude Code 进行 AI 辅助开发——我负责架构设计和产品决策，AI 帮助我快速实现代码。整个过程中，我会审查每段代码，确保我理解它的工作原理。最终通过 Cloudflare Pages 部署上线。这个流程让我在两周内从零基础到发布了三个可用的 Web 应用。',
      en: 'For each project, I started with requirements analysis: identifying target users, core features, and tech stack. Then I used Claude Code for AI-assisted development — I handled architecture and product decisions while AI helped me implement code quickly. Throughout the process, I reviewed every piece of code to ensure I understood how it worked. Finally, I deployed via Cloudflare Pages. This workflow allowed me to go from zero experience to shipping three functional web apps in two weeks.',
    },
  },
  {
    q: { zh: 'AI 生成的代码和手写代码有什么区别？', en: "What's the difference between AI-generated and hand-written code?" },
    a: {
      zh: '本质上，好代码就是好代码，不管谁写的。关键区别在于开发过程：AI 生成的代码需要人来审查、测试和优化。我的做法是：先让 AI 生成初始代码，然后我仔细审查逻辑、检查安全性、优化性能、并确保代码风格一致。这个过程本身就是一种高效的学习方式——我通过审查 AI 的代码快速掌握了最佳实践。',
      en: 'Fundamentally, good code is good code regardless of who wrote it. The key difference is in the process: AI-generated code needs human review, testing, and optimization. My approach: let AI generate initial code, then I carefully review logic, check security, optimize performance, and ensure consistent code style. This review process itself is an efficient learning method — I rapidly learned best practices by reviewing AI\'s code.',
    },
  },
  {
    q: { zh: '你如何确保 AI 生成代码的质量？', en: 'How do you ensure AI-generated code quality?' },
    a: {
      zh: '我有一套系统化的流程：首先，我会给 AI 明确的上下文和约束条件，避免生成偏离需求的代码。其次，我逐行审查关键逻辑，特别是涉及安全和数据处理的部分。然后，我在浏览器中测试所有功能路径，检查控制台是否有错误。最后，我会让 AI 帮我写测试用例，并检查边界情况。这不是盲目信任 AI，而是"信任但验证"的协作模式。',
      en: 'I follow a systematic process: First, I provide AI with clear context and constraints to avoid off-target code. Second, I review critical logic line by line, especially security and data handling. Third, I test all functional paths in the browser and check the console for errors. Finally, I have AI help write test cases and check edge cases. It\'s not blind trust — it\'s a "trust but verify" collaboration model.',
    },
  },
  {
    q: { zh: '你觉得 AI 在软件开发中五年后会怎样？', en: 'Where do you see AI in software development in 5 years?' },
    a: {
      zh: 'AI 会成为每个开发者的标配工具，就像今天的 IDE 和 Git 一样。但它不会取代开发者——反而会提高门槛：未来的开发者需要更强的系统设计能力、产品思维和 AI 协作技能。能够有效"指挥" AI 的人，会比只会手写代码的人更有竞争力。现在学习 AI 辅助开发，就是在为这个未来做准备。最稀缺的将是既懂技术、又懂业务、还会与 AI 协作的"全栈人才"。',
      en: 'AI will become standard tooling for every developer, just like IDEs and Git today. But it won\'t replace developers — it will raise the bar: future developers will need stronger system design skills, product thinking, and AI collaboration abilities. People who can effectively "conduct" AI will be more competitive than those who only hand-write code. Learning AI-assisted development now is preparing for that future. The scarcest talent will be "full-stack thinkers" who understand technology, business, and AI collaboration.',
    },
  },
];

const successStories = [
  {
    name: { zh: '李明 (Ming)', en: 'Ming Li' },
    avatar: 'ML',
    university: { zh: '加州大学洛杉矶分校 (UCLA)', en: 'UCLA' },
    role: { zh: '初级前端工程师 @ Stripe', en: 'Junior Frontend Engineer @ Stripe' },
    quote: {
      zh: '面试时我展示了自己用 Claude Code 做的三个项目，面试官对我两周内的学习速度印象深刻。AI 技能让我脱颖而出。',
      en: 'I showed three projects I built with Claude Code during my interview. The interviewer was impressed by my learning speed in just two weeks. AI skills set me apart.',
    },
  },
  {
    name: { zh: '张薇 (Vivian)', en: 'Vivian Zhang' },
    avatar: 'VZ',
    university: { zh: '卡内基梅隆大学 (CMU)', en: 'Carnegie Mellon University' },
    role: { zh: '产品经理 @ Google', en: 'Product Manager @ Google' },
    quote: {
      zh: '虽然我不是工程师，但能自己做原型让我在 PM 面试中大放异彩。面试官说我是他们见过的最有技术感的 PM 候选人。',
      en: 'Even though I\'m not an engineer, being able to prototype on my own made me shine in PM interviews. The interviewer said I was the most technically capable PM candidate they\'d seen.',
    },
  },
  {
    name: { zh: '王晨 (Chris)', en: 'Chris Wang' },
    avatar: 'CW',
    university: { zh: '哥伦比亚大学 (Columbia)', en: 'Columbia University' },
    role: { zh: 'AI 产品实习生 @ Microsoft', en: 'AI Product Intern @ Microsoft' },
    quote: {
      zh: '我的 H-1B 申请因为有部署上线的项目作品集而变得更加有力。雇主看到我的实际能力，毫不犹豫地为我提交了申请。',
      en: 'My H-1B application was strengthened by having a portfolio of deployed projects. My employer saw my real capabilities and didn\'t hesitate to file for me.',
    },
  },
];

/**
 * Render the Career Corner page HTML.
 * @returns {string} HTML string
 */
export function render() {
  const lang = getLanguage();

  return `
    <div class="max-w-5xl mx-auto px-4 pt-20 pb-6 space-y-8">

      <!-- ========== PAGE HEADER ========== -->
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white">
          ${lang === 'zh' ? '职业角' : 'Career Corner'}
          <span class="text-gray-400 font-normal text-xl ml-2">${lang === 'zh' ? '/ Career Corner' : '/ 职业角'}</span>
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          ${lang === 'zh'
            ? 'AI 技能正在重塑留学生的职业前景——掌握 AI 辅助开发，让你在求职市场上脱颖而出。'
            : 'AI skills are reshaping career prospects for international students — master AI-assisted development and stand out in the job market.'}
        </p>
      </div>

      <!-- ========== STAT CARDS ========== -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${stats.map(s => `
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 text-center">
            <p class="text-3xl md:text-4xl font-extrabold text-[#FF6B4A]">${s.number}</p>
            <p class="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">${s.desc[lang]}</p>
            <p class="mt-1 text-[10px] text-gray-400 dark:text-gray-500">${s.source[lang]}</p>
          </div>
        `).join('')}
      </div>

      <!-- ========== WHY THIS MATTERS ========== -->
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
          ${lang === 'zh' ? '为什么这很重要' : 'Why This Matters'}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${articles.map((a, i) => `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div class="p-5">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl ${a.color} text-xl mb-3">
                  ${a.icon}
                </div>
                <h3 class="text-base font-bold text-gray-800 dark:text-white leading-snug">
                  ${a.title[lang]}
                  <span class="block text-sm font-normal text-gray-400 mt-0.5">${a.title[lang === 'zh' ? 'en' : 'zh']}</span>
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">${a.preview[lang]}</p>
                <div id="article-full-${i}" class="hidden mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">${a.full[lang]}</div>
                <button class="article-read-more mt-3 text-sm font-semibold text-[#FF6B4A] hover:text-[#e85d3f] transition-colors" data-article-index="${i}">
                  ${lang === 'zh' ? '阅读更多 →' : 'Read more →'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ========== RESUME TIPS ========== -->
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
          ${lang === 'zh' ? '简历技巧：前后对比' : 'Resume Tips: Before & After'}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Before -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border-l-4 border-red-400">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-sm font-bold">✗</span>
              <h3 class="text-base font-bold text-red-500">Before</h3>
            </div>
            <div class="bg-red-50 dark:bg-red-900/10 rounded-xl p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 italic">"Familiar with web technologies"</p>
            </div>
            <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
              ${lang === 'zh' ? '太模糊，没有具体证据，和其他候选人没有区别' : 'Too vague, no evidence, indistinguishable from other candidates'}
            </p>
          </div>
          <!-- After -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border-l-4 border-[#4ECDC4]">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[#4ECDC4] text-sm font-bold">✓</span>
              <h3 class="text-base font-bold text-[#4ECDC4]">After</h3>
            </div>
            <div class="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 italic">"Built and deployed 3 web applications using AI-assisted development (Claude Code), reducing development time by 70%"</p>
            </div>
            <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
              ${lang === 'zh' ? '量化成果、具体工具、可验证的部署链接' : 'Quantified results, specific tools, verifiable deployment links'}
            </p>
          </div>
        </div>
      </div>

      <!-- ========== INTERVIEW PREP ACCORDION ========== -->
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
          ${lang === 'zh' ? '面试准备：常见问题' : 'Interview Prep: Common Questions'}
        </h2>
        <div class="space-y-3">
          ${interviewQA.map((qa, i) => `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <button class="accordion-toggle w-full flex items-center justify-between p-5 text-left" aria-expanded="false" data-accordion-index="${i}">
                <div class="flex-1 pr-4">
                  <p class="text-sm font-bold text-gray-800 dark:text-white">${qa.q[lang]}</p>
                  <p class="text-xs text-gray-400 mt-0.5">${qa.q[lang === 'zh' ? 'en' : 'zh']}</p>
                </div>
                <svg class="accordion-chevron w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0" data-accordion-index="${i}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="accordion-body-${i}" class="hidden px-5 pb-5">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">${qa.a[lang]}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ========== SUCCESS STORIES ========== -->
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
          ${lang === 'zh' ? '成功案例' : 'Success Stories'}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${successStories.map(s => `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B4A] to-[#4ECDC4] flex items-center justify-center text-white font-bold text-sm">
                  ${s.avatar}
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800 dark:text-white">${s.name[lang]}</p>
                  <p class="text-xs text-gray-400">${s.university[lang]}</p>
                </div>
              </div>
              <p class="text-xs font-semibold text-[#4ECDC4] mb-2">${s.role[lang]}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">"${s.quote[lang]}"</p>
            </div>
          `).join('')}
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center italic">${lang === 'zh' ? '* 以上案例为模拟情景，仅供参考。' : '* These stories are illustrative examples.'}</p>
      </div>

    </div>
  `;
}

/**
 * Attach event listeners for the Career Corner page.
 */
export function init() {
  // --- Article "Read More" Toggle ---
  document.querySelectorAll('.article-read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.articleIndex;
      const fullEl = document.getElementById(`article-full-${index}`);
      if (!fullEl) return;

      const lang = getLanguage();
      const isHidden = fullEl.classList.contains('hidden');

      if (isHidden) {
        fullEl.classList.remove('hidden');
        btn.textContent = lang === 'zh' ? '收起 ↑' : 'Show less ↑';
      } else {
        fullEl.classList.add('hidden');
        btn.textContent = lang === 'zh' ? '阅读更多 →' : 'Read more →';
      }
    });
  });

  // --- Accordion Toggle ---
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.accordionIndex;
      const body = document.getElementById(`accordion-body-${index}`);
      const chevron = btn.querySelector('.accordion-chevron');
      if (!body) return;

      const isHidden = body.classList.contains('hidden');

      if (isHidden) {
        body.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        btn.setAttribute('aria-expanded', 'true');
      } else {
        body.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
