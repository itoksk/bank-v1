import { Material, MaterialSearchParams } from '../types/material';
import { mockMaterials } from '../data/mockMaterials';

// Simulate API calls with mock data

export const fetchPopularMaterials = async (params: MaterialSearchParams): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMaterials = [...mockMaterials];
      
      // Apply filters
      if (params.category && params.category !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.subject === params.category);
      }
      
      if (params.grade && params.grade !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.grade === params.grade);
      }
      
      if (params.subject && params.subject !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.subject === params.subject);
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
      
      // Apply filters
      if (params.category && params.category !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.subject === params.category);
      }
      
      if (params.grade && params.grade !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.grade === params.grade);
      }
      
      if (params.subject && params.subject !== 'all') {
        filteredMaterials = filteredMaterials.filter(m => m.subject === params.subject);
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