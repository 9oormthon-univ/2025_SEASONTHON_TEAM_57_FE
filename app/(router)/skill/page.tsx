'use client';

import { useState, useEffect } from 'react';

import CategoryChips from '@/components/category/categoryChips';
import { SkillPostData } from '@/service/interfaces/skill';

import FilterTab from './_components/FilterTab';
import PostList from './_components/PostList';

export default function SkillSharePage() {
  const [Category, setCategory] = useState<number>(0);
  const [skills, setSkills] = useState<SkillPostData[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`/api/skill/getCategory?categoryId=${Category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        const data = (await response.json()) as SkillPostData[];
        console.log('재능공유', data);
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, [Category]);

  const handleFilterChange = (index: number) => {
    console.log('선택된 필터:', index);
  };

  return (
    <>
      <div className="mt-4">
        <FilterTab
          defaultIndex={0}
          onChange={handleFilterChange}
        />
      </div>

      <div className="flex items-center justify-between mt-[2.0rem] mb-[10px]">
        <h3 className="h3 text-[var(--black)]">카테고리</h3>
      </div>

      <div className="mt-4">
        <CategoryChips
          className="mt-[1.2rem]"
          activeIndex={Category}
          onSelect={setCategory}
        />
      </div>

      <div className="flex items-center justify-between mt-[40px] mb-[12px]">
        <h3 className="h3 text-[var(--black)]">온심이 님께 추천드리는 재능공유</h3>
      </div>

      <div className="mt-[1.2rem]">
        {skills.length > 0 &&
          skills.map((skill, i) => (
            <PostList
              key={i}
              posts={[{ ...skill, content: skill.title, categoryId: skill.categories[0].name }]}
            />
          ))}
      </div>

      <div className="h-6" />
    </>
  );
}
