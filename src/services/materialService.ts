import { Material, MaterialSearchParams } from '../types/material';
import { mockMaterials } from '../data/mockMaterials';

// Simulate API calls with mock data

export const fetchPopularMaterials = async (params: MaterialSearchParams): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMaterials = [...mockMaterials];
      
      // Apply filters
      if (params.category && params.category !== 'all') {
        // 日本語の教科名でフィルタリング
        const categoryMap: { [key: string]: string } = {
          'math': '数学',
          'japanese': '国語', 
          'science': '理科',
          'social': '社会',
          'english': '英語',
          'moral': '道徳',
          'information': '情報',
          'technology': '技術',
          'art': '美術',
          'music': '音楽',
          'nursing': '看護',
          'fishery': '水産',
          'agriculture': '農業',
          'industry': '工業',
          'ict': 'ICT',
          'ai': '生成AI',
          'citizenship': 'デジタルシティズンシップ',
          'other': 'その他'
        };
        
        const japaneseCategory = categoryMap[params.category] || params.category;
        filteredMaterials = filteredMaterials.filter(m => m.subject === japaneseCategory);
      }
      
      if (params.grade && params.grade !== 'all') {
        // 学校種別での包括的フィルタリング
        if (params.grade === 'elementary') {
          // 小学校の場合：小学1年生〜6年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '小学1年生' || m.grade === '小学2年生' || m.grade === '小学3年生' ||
            m.grade === '小学4年生' || m.grade === '小学5年生' || m.grade === '小学6年生' ||
            m.grade === '小学校'
          );
        } else if (params.grade === 'junior-high') {
          // 中学校の場合：中学1年生〜3年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '中学1年生' || m.grade === '中学2年生' || m.grade === '中学3年生' ||
            m.grade === '中学校'
          );
        } else if (params.grade === 'high-school') {
          // 高等学校の場合：高校1年生〜3年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '高校1年生' || m.grade === '高校2年生' || m.grade === '高校3年生' ||
            m.grade === '高等学校'
          );
        } else {
          // 具体的な学年での絞り込み
          const gradeMap: { [key: string]: string } = {
            'elementary-1': '小学1年生',
            'elementary-2': '小学2年生',
            'elementary-3': '小学3年生',
            'elementary-4': '小学4年生',
            'elementary-5': '小学5年生',
            'elementary-6': '小学6年生',
            'junior-high-1': '中学1年生',
            'junior-high-2': '中学2年生',
            'junior-high-3': '中学3年生',
            'high-school-1': '高校1年生',
            'high-school-2': '高校2年生',
            'high-school-3': '高校3年生'
          };
          
          const japaneseGrade = gradeMap[params.grade] || params.grade;
          filteredMaterials = filteredMaterials.filter(m => m.grade === japaneseGrade);
        }
      }
      
      if (params.subject && params.subject !== 'all') {
        // 日本語の教科名でフィルタリング（subjectパラメータ用）
        const subjectMap: { [key: string]: string } = {
          'math': '数学',
          'japanese': '国語', 
          'science': '理科',
          'social': '社会',
          'english': '英語',
          'moral': '道徳',
          'information': '情報',
          'technology': '技術',
          'art': '美術',
          'music': '音楽',
          'nursing': '看護',
          'fishery': '水産',
          'agriculture': '農業',
          'industry': '工業',
          'ict': 'ICT',
          'ai': '生成AI',
          'citizenship': 'デジタルシティズンシップ',
          'other': 'その他'
        };
        
        const japaneseSubject = subjectMap[params.subject] || params.subject;
        filteredMaterials = filteredMaterials.filter(m => m.subject === japaneseSubject);
      }

      if (params.difficulty) {
        filteredMaterials = filteredMaterials.filter(m => m.difficulty === params.difficulty);
      }

      if (params.duration) {
        switch (params.duration) {
          case 'short':
            filteredMaterials = filteredMaterials.filter(m => m.duration <= 30);
            break;
          case 'standard':
            filteredMaterials = filteredMaterials.filter(m => m.duration > 30 && m.duration <= 50);
            break;
          case 'long':
            filteredMaterials = filteredMaterials.filter(m => m.duration > 50);
            break;
        }
      }
      
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredMaterials = filteredMaterials.filter(
          m => m.title.toLowerCase().includes(query) || 
               m.description.toLowerCase().includes(query) ||
               m.subject.toLowerCase().includes(query) ||
               m.grade.toLowerCase().includes(query) ||
               m.author.displayName?.toLowerCase().includes(query)
        );
      }

      if (params.author) {
        filteredMaterials = filteredMaterials.filter(m => m.author.id === params.author);
      }
      
      // Apply sorting
      switch (params.sortBy) {
        case 'newest':
          filteredMaterials.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'popular':
          filteredMaterials.sort((a, b) => b.likeCount - a.likeCount);
          break;
        case 'rating':
          // Mock rating sort - in real app would use actual ratings
          filteredMaterials.sort((a, b) => (b.likeCount / Math.max(b.viewCount, 1)) - (a.likeCount / Math.max(a.viewCount, 1)));
          break;
        case 'duration':
          filteredMaterials.sort((a, b) => a.duration - b.duration);
          break;
        case 'difficulty':
          filteredMaterials.sort((a, b) => a.difficulty - b.difficulty);
          break;
        case 'relevance':
        default:
          // Default relevance sort by view count
          filteredMaterials.sort((a, b) => b.viewCount - a.viewCount);
          break;
      }
      
      // Apply pagination
      const limit = params.limit || 10;
      const page = params.page || 1;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      resolve(filteredMaterials.slice(start, end));
    }, 500);
  });
};

export const fetchLatestMaterials = async (params: MaterialSearchParams): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMaterials = [...mockMaterials];
      
      // Apply filters with Japanese mapping
      if (params.category && params.category !== 'all') {
        const categoryMap: { [key: string]: string } = {
          'math': '数学',
          'japanese': '国語', 
          'science': '理科',
          'social': '社会',
          'english': '英語',
          'moral': '道徳',
          'information': '情報',
          'technology': '技術',
          'art': '美術',
          'music': '音楽',
          'nursing': '看護',
          'fishery': '水産',
          'agriculture': '農業',
          'industry': '工業',
          'ict': 'ICT',
          'ai': '生成AI',
          'citizenship': 'デジタルシティズンシップ',
          'other': 'その他'
        };
        
        const japaneseCategory = categoryMap[params.category] || params.category;
        filteredMaterials = filteredMaterials.filter(m => m.subject === japaneseCategory);
      }
      
      if (params.grade && params.grade !== 'all') {
        // 学校種別での包括的フィルタリング
        if (params.grade === 'elementary') {
          // 小学校の場合：小学1年生〜6年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '小学1年生' || m.grade === '小学2年生' || m.grade === '小学3年生' ||
            m.grade === '小学4年生' || m.grade === '小学5年生' || m.grade === '小学6年生' ||
            m.grade === '小学校'
          );
        } else if (params.grade === 'junior-high') {
          // 中学校の場合：中学1年生〜3年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '中学1年生' || m.grade === '中学2年生' || m.grade === '中学3年生' ||
            m.grade === '中学校'
          );
        } else if (params.grade === 'high-school') {
          // 高等学校の場合：高校1年生〜3年生すべて
          filteredMaterials = filteredMaterials.filter(m => 
            m.grade === '高校1年生' || m.grade === '高校2年生' || m.grade === '高校3年生' ||
            m.grade === '高等学校'
          );
        } else {
          // 具体的な学年での絞り込み
          const gradeMap: { [key: string]: string } = {
            'elementary-1': '小学1年生',
            'elementary-2': '小学2年生',
            'elementary-3': '小学3年生',
            'elementary-4': '小学4年生',
            'elementary-5': '小学5年生',
            'elementary-6': '小学6年生',
            'junior-high-1': '中学1年生',
            'junior-high-2': '中学2年生',
            'junior-high-3': '中学3年生',
            'high-school-1': '高校1年生',
            'high-school-2': '高校2年生',
            'high-school-3': '高校3年生'
          };
          
          const japaneseGrade = gradeMap[params.grade] || params.grade;
          filteredMaterials = filteredMaterials.filter(m => m.grade === japaneseGrade);
        }
      }
      
      if (params.subject && params.subject !== 'all') {
        const subjectMap: { [key: string]: string } = {
          'math': '数学',
          'japanese': '国語', 
          'science': '理科',
          'social': '社会',
          'english': '英語',
          'moral': '道徳',
          'information': '情報',
          'technology': '技術',
          'art': '美術',
          'music': '音楽',
          'nursing': '看護',
          'fishery': '水産',
          'agriculture': '農業',
          'industry': '工業',
          'ict': 'ICT',
          'ai': '生成AI',
          'citizenship': 'デジタルシティズンシップ',
          'other': 'その他'
        };
        
        const japaneseSubject = subjectMap[params.subject] || params.subject;
        filteredMaterials = filteredMaterials.filter(m => m.subject === japaneseSubject);
      }
      
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredMaterials = filteredMaterials.filter(
          m => m.title.toLowerCase().includes(query) || 
               m.description.toLowerCase().includes(query)
        );
      }
      
      // Sort by creation date
      filteredMaterials.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Apply pagination
      const limit = params.limit || 10;
      const page = params.page || 1;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      resolve(filteredMaterials.slice(start, end));
    }, 500);
  });
};

export const fetchFeaturedMaterials = async (params: { limit?: number }): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get random materials for featured section
      const shuffled = [...mockMaterials].sort(() => 0.5 - Math.random());
      const limit = params.limit || 3;
      
      resolve(shuffled.slice(0, limit));
    }, 500);
  });
};

export const fetchMaterialById = async (id: string): Promise<Material> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const material = mockMaterials.find(m => m.id === id);
      if (material) {
        resolve(material);
      } else {
        reject(new Error('Material not found'));
      }
    }, 500);
  });
};

export const fetchRelatedMaterials = async (
  materialId: string, 
  limit: number = 4
): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentMaterial = mockMaterials.find(m => m.id === materialId);
      if (!currentMaterial) {
        resolve([]);
        return;
      }
      
      // Find materials with the same subject and grade
      let related = mockMaterials.filter(
        m => m.id !== materialId && 
        (m.subject === currentMaterial.subject || m.grade === currentMaterial.grade)
      );
      
      // Sort by relevance (simple algorithm - could be improved)
      related.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        
        if (a.subject === currentMaterial.subject) scoreA += 2;
        if (a.grade === currentMaterial.grade) scoreA += 1;
        
        if (b.subject === currentMaterial.subject) scoreB += 2;
        if (b.grade === currentMaterial.grade) scoreB += 1;
        
        return scoreB - scoreA;
      });
      
      resolve(related.slice(0, limit));
    }, 500);
  });
};

export const forkMaterial = async (materialId: string, customizations: {
  title?: string;
  description?: string;
  targetGrade?: string;
  targetSubject?: string;
  difficulty?: number;
  duration?: number;
  customInstructions?: string;
}): Promise<Material> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const originalMaterial = mockMaterials.find(m => m.id === materialId);
      if (!originalMaterial) {
        reject(new Error('Original material not found'));
        return;
      }

      // Create forked material
      const forkedMaterial: Material = {
        ...originalMaterial,
        id: `fork-${Date.now()}`,
        title: customizations.title || `${originalMaterial.title} (フォーク版)`,
        description: customizations.description || originalMaterial.description,
        subject: customizations.targetSubject || originalMaterial.subject,
        grade: customizations.targetGrade || originalMaterial.grade,
        difficulty: customizations.difficulty || originalMaterial.difficulty,
        duration: customizations.duration || originalMaterial.duration,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
        likeCount: 0,
        forkCount: 0,
        version: 'v1.0',
        forkFrom: {
          id: originalMaterial.id,
          title: originalMaterial.title
        }
      };

      // Update original material's fork count
      const originalIndex = mockMaterials.findIndex(m => m.id === materialId);
      if (originalIndex !== -1) {
        mockMaterials[originalIndex] = {
          ...mockMaterials[originalIndex],
          forkCount: mockMaterials[originalIndex].forkCount + 1
        };
      }

      // Add forked material to mock data
      mockMaterials.push(forkedMaterial);

      resolve(forkedMaterial);
    }, 1000);
  });
};