/**
 * Claude Code Commands — Bilingual Reference Data
 * Curated for beginners learning Claude Code
 */

export const commandCategories = [
  {
    id: 'project',
    label: { zh: '项目管理', en: 'Project Management' },
    color: '#FF6B4A',
  },
  {
    id: 'info',
    label: { zh: '信息与状态', en: 'Information & Status' },
    color: '#4ECDC4',
  },
  {
    id: 'mode',
    label: { zh: '模式与模型', en: 'Mode & Model Control' },
    color: '#667eea',
  },
  {
    id: 'code',
    label: { zh: '代码与文件', en: 'Code & File Operations' },
    color: '#f093fb',
  },
  {
    id: 'integrations',
    label: { zh: '集成与扩展', en: 'Integrations & Extensions' },
    color: '#43e97b',
  },
  {
    id: 'cli',
    label: { zh: '命令行', en: 'CLI Commands' },
    color: '#FFD93D',
  },
];

export const commands = [
  // ── Project Management ──
  {
    command: '/init',
    category: 'project',
    description: {
      zh: '自动生成项目的 CLAUDE.md 配置文件',
      en: 'Auto-generate a CLAUDE.md for your project',
    },
  },
  {
    command: '/memory',
    category: 'project',
    description: {
      zh: '编辑 CLAUDE.md 记忆文件',
      en: 'Edit the CLAUDE.md memory file',
    },
  },
  {
    command: '/context',
    category: 'project',
    description: {
      zh: '查看当前占用上下文窗口的内容',
      en: 'See what is consuming your context window',
    },
  },
  {
    command: '/compact',
    category: 'project',
    description: {
      zh: '压缩上下文，释放空间',
      en: 'Compress context to free up space',
    },
  },
  {
    command: '/clear',
    category: 'project',
    description: {
      zh: '重置对话历史',
      en: 'Reset conversation history',
    },
  },
  {
    command: '/resume',
    category: 'project',
    description: {
      zh: '恢复之前的对话',
      en: 'Resume a past session',
    },
  },
  {
    command: '/fork',
    category: 'project',
    description: {
      zh: '将对话分支到新的会话',
      en: 'Branch conversation into a new session',
    },
  },
  {
    command: '/rename',
    category: 'project',
    description: {
      zh: '重命名当前会话',
      en: 'Rename the current session',
    },
  },
  {
    command: '/add-dir',
    category: 'project',
    description: {
      zh: '添加额外目录到上下文',
      en: 'Add an extra directory to context',
    },
  },
  {
    command: '/copy',
    category: 'project',
    description: {
      zh: '选择并复制代码块',
      en: 'Select and copy code blocks',
    },
  },
  {
    command: '/diff',
    category: 'project',
    description: {
      zh: '在交互式查看器中查看所有更改',
      en: 'View all changes in an interactive viewer',
    },
  },
  {
    command: '/export',
    category: 'project',
    description: {
      zh: '导出对话到文件或剪贴板',
      en: 'Export conversation to file or clipboard',
    },
  },

  // ── Information & Status ──
  {
    command: '/usage',
    category: 'info',
    description: {
      zh: '查看 token 使用量和计划限制',
      en: 'Check token usage against plan limits',
    },
  },
  {
    command: '/cost',
    category: 'info',
    description: {
      zh: '显示当前会话的费用',
      en: 'Show current session cost',
    },
  },
  {
    command: '/help',
    category: 'info',
    description: {
      zh: '列出所有可用命令',
      en: 'List all available commands',
    },
  },
  {
    command: '/tasks',
    category: 'info',
    description: {
      zh: '查看后台运行的任务',
      en: 'Check background tasks',
    },
  },
  {
    command: '/doctor',
    category: 'info',
    description: {
      zh: '运行环境诊断检查',
      en: 'Run environment diagnostics',
    },
  },
  {
    command: '/stats',
    category: 'info',
    description: {
      zh: '生成使用统计的 HTML 报告',
      en: 'Generate usage statistics as HTML report',
    },
  },
  {
    command: '/debug',
    category: 'info',
    description: {
      zh: '显示故障排除信息',
      en: 'Display troubleshooting info',
    },
  },
  {
    command: '/effort',
    category: 'info',
    description: {
      zh: '切换思考深度（低/中/高/自动）',
      en: 'Switch thinking level (low/medium/high/auto)',
    },
  },

  // ── Mode & Model Control ──
  {
    command: '/model',
    category: 'mode',
    description: {
      zh: '在 Opus、Sonnet 和 Haiku 之间切换',
      en: 'Switch between Opus, Sonnet, and Haiku',
    },
  },
  {
    command: '/fast',
    category: 'mode',
    description: {
      zh: '切换快速模式（Opus 4.6 加速 2.5 倍）',
      en: 'Toggle Fast Mode (Opus 4.6 at 2.5x speed)',
    },
  },
  {
    command: '/plan',
    category: 'mode',
    description: {
      zh: '切换计划模式（只做规划不写代码）',
      en: 'Toggle Plan Mode (read-only planning)',
    },
  },
  {
    command: '/permissions',
    category: 'mode',
    description: {
      zh: '查看和管理工具权限设置',
      en: 'View and manage tool permission settings',
    },
  },
  {
    command: '/config',
    category: 'mode',
    description: {
      zh: '打开 Claude Code 配置设置',
      en: 'Open Claude Code configuration settings',
    },
  },
  {
    command: '/terminal-setup',
    category: 'mode',
    description: {
      zh: '配置终端集成（状态栏等）',
      en: 'Configure terminal integration (status line, etc.)',
    },
  },

  // ── Code & File Operations ──
  {
    command: '/vim',
    category: 'code',
    description: {
      zh: '在 Vim 编辑器中编辑文件',
      en: 'Edit a file in the Vim editor',
    },
  },
  {
    command: '/search',
    category: 'code',
    description: {
      zh: '在项目中搜索文件和代码',
      en: 'Search for files and code in the project',
    },
  },
  {
    command: '/commit',
    category: 'code',
    description: {
      zh: '暂存更改并创建 Git 提交',
      en: 'Stage changes and create a Git commit',
    },
  },
  {
    command: '/pr',
    category: 'code',
    description: {
      zh: '创建 GitHub Pull Request',
      en: 'Create a GitHub Pull Request',
    },
  },

  // ── Integrations & Extensions ──
  {
    command: '/install-github-app',
    category: 'integrations',
    description: {
      zh: '设置 GitHub PR 自动审查',
      en: 'Set up GitHub PR auto-review',
    },
  },
  {
    command: '/plugin',
    category: 'integrations',
    description: {
      zh: '插件管理（添加/删除/市场）',
      en: 'Plugin management (add/remove/marketplace)',
    },
  },
  {
    command: '/mcp',
    category: 'integrations',
    description: {
      zh: '查看 MCP 状态和认证',
      en: 'Check MCP states and authentication',
    },
  },
  {
    command: '/review',
    category: 'integrations',
    description: {
      zh: '对指定 PR 进行代码审查',
      en: 'Code review for a specified PR',
    },
  },
  {
    command: '/skills',
    category: 'integrations',
    description: {
      zh: '技能管理菜单',
      en: 'Skill management menu',
    },
  },
  {
    command: '/ide',
    category: 'integrations',
    description: {
      zh: '管理 IDE 集成',
      en: 'Manage IDE integrations',
    },
  },

  // ── CLI Commands ──
  {
    command: 'claude',
    category: 'cli',
    description: {
      zh: '启动交互式会话',
      en: 'Start an interactive session',
    },
  },
  {
    command: 'claude "问题"',
    category: 'cli',
    description: {
      zh: '带初始提示启动会话',
      en: 'Start with an initial prompt',
    },
  },
  {
    command: 'claude -p "问题"',
    category: 'cli',
    description: {
      zh: '非交互模式，完成后退出',
      en: 'Non-interactive mode, then exit',
    },
  },
  {
    command: 'claude -c',
    category: 'cli',
    description: {
      zh: '恢复最近的会话',
      en: 'Resume the most recent session',
    },
  },
  {
    command: 'claude -r "ID"',
    category: 'cli',
    description: {
      zh: '通过 ID 恢复指定会话',
      en: 'Resume a session by ID',
    },
  },
  {
    command: 'claude update',
    category: 'cli',
    description: {
      zh: '更新到最新版本',
      en: 'Update to latest version',
    },
  },
  {
    command: 'claude mcp add',
    category: 'cli',
    description: {
      zh: '添加一个 MCP 服务器',
      en: 'Add an MCP server',
    },
  },
  {
    command: 'claude mcp list',
    category: 'cli',
    description: {
      zh: '列出已配置的 MCP 服务器',
      en: 'List configured MCP servers',
    },
  },
  {
    command: 'claude --from-pr',
    category: 'cli',
    description: {
      zh: '恢复与 PR 关联的会话',
      en: 'Resume session linked to a PR',
    },
  },
];
