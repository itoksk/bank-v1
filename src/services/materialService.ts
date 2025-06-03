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
      
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredMaterials = filteredMaterials.filter(
          m => m.title.toLowerCase().includes(query) || 
               m.description.toLowerCase().includes(query)
        );
      }
      
      // Sort by popularity (like count)
      filteredMaterials.sort((a, b) => b.likeCount - a.likeCount);
      
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