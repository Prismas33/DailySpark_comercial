// 🎭 MOCK DATA SERVICE
// Provides fake data for the commercial demo version
// All data is generated locally, no external API calls

export interface MockTemplate {
  id: string;
  title: string;
  content: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  category: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface MockPost {
  id: string;
  content: string;
  platform: string[];
  scheduledFor: Date;
  status: 'scheduled' | 'published' | 'failed';
  imageUrl?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface MockSocialAccount {
  id: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  accountName: string;
  connected: boolean;
  followers: number;
  profileImage: string;
}

export interface MockAnalytics {
  totalPosts: number;
  totalEngagement: number;
  totalReach: number;
  engagementRate: number;
  topPerformingPost: string;
  weeklyGrowth: number;
}

// Mock templates
export const mockTemplates: MockTemplate[] = [
  {
    id: 'template_1',
    title: '🚀 Product Launch Announcement',
    content: 'Excited to announce our latest innovation! 🎉\n\nAfter months of hard work, we\'re launching [Product Name] - designed to [solve problem].\n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nLearn more: [link]\n\n#ProductLaunch #Innovation #Tech',
    platform: 'linkedin',
    category: 'Product Launch',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'template_2',
    title: '💡 Industry Insight',
    content: 'Here\'s a key trend we\'re seeing in [industry] 📊\n\nThe data shows that [insight]...\n\nWhat this means for businesses:\n1. [Implication 1]\n2. [Implication 2]\n3. [Implication 3]\n\nWhat\'s your take? Share in the comments! 💬\n\n#Industry #Trends #BusinessInsights',
    platform: 'linkedin',
    category: 'Industry News',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'template_3',
    title: '🎯 Quick Tip Tuesday',
    content: '⚡ Quick Tip:\n\n[Share a valuable tip related to your industry]\n\nPro tip: [Additional advice]\n\nTry it and let me know how it works! 👇\n\n#Tips #Productivity #GrowthHacks',
    platform: 'twitter',
    category: 'Tips & Tricks',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'template_4',
    title: '🌟 Customer Success Story',
    content: 'Love seeing our customers succeed! 💙\n\n[Customer Name] achieved [impressive result] using our solution.\n\n"[Customer quote]" - [Customer Name], [Title]\n\nReady to achieve similar results? Let\'s talk! 🚀\n\n#CustomerSuccess #CaseStudy #Results',
    platform: 'linkedin',
    category: 'Customer Stories',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'template_5',
    title: '📚 Monday Motivation',
    content: '"[Inspiring quote]"\n\nStart your week strong! 💪\n\nWhat\'s your #1 goal for this week?\n\n#MondayMotivation #Goals #Success',
    platform: 'instagram',
    category: 'Motivation',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    createdAt: new Date('2024-02-05'),
  },
];

// Mock scheduled posts
export const mockScheduledPosts: MockPost[] = [
  {
    id: 'post_1',
    content: 'Excited to share our Q1 results! 📈 We\'ve achieved 150% growth and expanded our team. Here\'s to continued success! 🎉 #BusinessGrowth #TeamWork',
    platform: ['linkedin', 'twitter'],
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    id: 'post_2',
    content: '🚀 New feature alert! We just launched real-time analytics. Check it out and let us know what you think! #ProductUpdate #Innovation',
    platform: ['twitter'],
    scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    status: 'scheduled',
  },
  {
    id: 'post_3',
    content: 'Join us for our webinar on "AI in Marketing" next week! 🎓 Limited spots available. Register now! #Webinar #AIMarketing',
    platform: ['linkedin', 'facebook'],
    scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
  },
];

// Mock published posts
export const mockPublishedPosts: MockPost[] = [
  {
    id: 'post_pub_1',
    content: 'Happy Friday everyone! 🎉 What are your weekend plans? Share below! 👇 #TGIF #Weekend',
    platform: ['twitter', 'instagram'],
    scheduledFor: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'published',
    engagement: {
      likes: 342,
      comments: 28,
      shares: 15,
    },
  },
  {
    id: 'post_pub_2',
    content: 'Thrilled to announce our partnership with @TechCompany! Together, we\'ll be revolutionizing [industry]. Stay tuned! 🚀 #Partnership #Innovation',
    platform: ['linkedin'],
    scheduledFor: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
    engagement: {
      likes: 521,
      comments: 47,
      shares: 89,
    },
  },
  {
    id: 'post_pub_3',
    content: 'Behind the scenes at our office! 📸 Our team hard at work bringing you the best solutions. #TeamCulture #WorkLife',
    platform: ['instagram', 'facebook'],
    scheduledFor: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    engagement: {
      likes: 412,
      comments: 31,
      shares: 22,
    },
  },
];

// Mock social accounts
export const mockSocialAccounts: MockSocialAccount[] = [
  {
    id: 'account_linkedin',
    platform: 'linkedin',
    accountName: 'DailySpark Marketing',
    connected: true,
    followers: 12547,
    profileImage: 'https://ui-avatars.com/api/?name=DailySpark&background=0077B5&color=fff&size=200',
  },
  {
    id: 'account_twitter',
    platform: 'twitter',
    accountName: '@dailyspark',
    connected: true,
    followers: 8932,
    profileImage: 'https://ui-avatars.com/api/?name=DS&background=1DA1F2&color=fff&size=200',
  },
  {
    id: 'account_facebook',
    platform: 'facebook',
    accountName: 'DailySpark',
    connected: true,
    followers: 15234,
    profileImage: 'https://ui-avatars.com/api/?name=DS&background=1877F2&color=fff&size=200',
  },
  {
    id: 'account_instagram',
    platform: 'instagram',
    accountName: '@dailyspark.marketing',
    connected: true,
    followers: 22187,
    profileImage: 'https://ui-avatars.com/api/?name=DS&background=E4405F&color=fff&size=200',
  },
];

// Mock analytics
export const mockAnalytics: MockAnalytics = {
  totalPosts: 127,
  totalEngagement: 15834,
  totalReach: 234567,
  engagementRate: 6.75,
  topPerformingPost: 'Partnership announcement with TechCompany',
  weeklyGrowth: 12.3,
};

// Generate random engagement for a post
export function generateRandomEngagement() {
  return {
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 50) + 5,
    shares: Math.floor(Math.random() * 100) + 10,
  };
}

// Simulate posting to social media (mock)
export async function mockPublishPost(content: string, platforms: string[], imageUrl?: string): Promise<MockPost> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const newPost: MockPost = {
    id: `post_${Date.now()}`,
    content,
    platform: platforms,
    scheduledFor: new Date(),
    status: 'published',
    imageUrl,
    engagement: generateRandomEngagement(),
  };

  return newPost;
}

// Simulate scheduling a post (mock)
export async function mockSchedulePost(
  content: string,
  platforms: string[],
  scheduledFor: Date,
  imageUrl?: string
): Promise<MockPost> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newPost: MockPost = {
    id: `post_${Date.now()}`,
    content,
    platform: platforms,
    scheduledFor,
    status: 'scheduled',
    imageUrl,
  };

  return newPost;
}

// Get all mock posts (scheduled + published)
export function getAllMockPosts(): MockPost[] {
  return [...mockScheduledPosts, ...mockPublishedPosts];
}

// Mock AI content generation with image suggestion
export async function mockGenerateAIContent(prompt: string, platform: string): Promise<string> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Templates with [Imagem: ...] embedded in the content
  const templates = [
    `🚀 Excited to share: ${prompt}\n\nHere's what makes this special:\n• Innovation at its finest\n• User-centric approach\n• Scalable solution\n\nWhat do you think? Let's discuss! 💬\n\n#Innovation #Tech #Growth\n\n[Imagem: Modern technology workspace with innovative devices and collaborative team environment]`,
    
    `💡 Quick insight about ${prompt}\n\nKey takeaways:\n1. Focus on value\n2. Build relationships\n3. Stay consistent\n\nYour thoughts? 👇\n\n#Business #Strategy #Success\n\n[Imagem: Business professional presenting strategy on digital board with growth charts]`,
    
    `🎯 ${prompt} - Here's why it matters:\n\nIn today's fast-paced world, staying ahead means embracing change. Let's make it happen!\n\n#Leadership #Change #Progress\n\n[Imagem: Leadership concept with person climbing success ladder against inspiring sky]`,
    
    `✨ Thrilled to announce: ${prompt}\n\nThis journey has been incredible! Key highlights:\n• Breakthrough innovation\n• Amazing team collaboration\n• Customer-first approach\n\nJoin us on this exciting path! 🚀\n\n#Achievement #Innovation #TeamWork\n\n[Imagem: Celebration scene with team high-fiving in modern office with success elements]`,
    
    `🌟 Game-changer alert: ${prompt}\n\nWhy this matters:\n→ Transforms the industry\n→ Empowers users\n→ Drives real results\n\nReady to be part of the revolution? 💪\n\n#Transformation #Impact #Future\n\n[Imagem: Futuristic technology interface with holographic elements and innovation concept]`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// Mock AI image generation
export async function mockGenerateAIImage(prompt: string): Promise<string> {
  // Simulate image generation
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return a placeholder image from Unsplash based on keywords
  const keywords = prompt.split(' ').slice(0, 2).join(',');
  return `https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80`;
}
