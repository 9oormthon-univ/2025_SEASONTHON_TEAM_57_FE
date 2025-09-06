'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { SkillType } from '@/constants/types';
import { CreateSkillPost } from '@/service/skill';

export async function createSkill(formData: FormData) {
  const type = (formData.get('type')?.toString() ?? '') as SkillType;
  const title = formData.get('title')?.toString()?.trim() ?? '';
  const content = formData.get('content')?.toString()?.trim() ?? '';
  const price = Number(formData.get('price')?.toString() ?? 0);

  const parseIds = (raw: string | null) => {
    if (!raw) return [] as number[];
    try {
      const arr = JSON.parse(raw) as (number | string)[];
      return arr
        .map(v => Number(v))
        .filter(v => Number.isFinite(v) && v > 0)
        .map(v => Math.trunc(v));
    } catch {
      return [];
    }
  };

  const learnCategoryIds = parseIds(formData.get('learnCategoryIds')?.toString() ?? '[]');
  const teachCategoryIds = parseIds(formData.get('teachCategoryIds')?.toString() ?? '[]');

  if (!['trade', 'learn', 'teach'].includes(type))
    throw new Error('유형(type)이 올바르지 않습니다.');
  if (!title) throw new Error('제목을 입력해 주세요.');
  if (!content) throw new Error('내용을 입력해 주세요.');
  if (price < 0) throw new Error('가격은 0 이상이어야 합니다.');

  await CreateSkillPost({
    type,
    title,
    content,
    learnCategoryIds,
    teachCategoryIds,
    price,
  });

  revalidatePath('/skill');
  redirect('/skill');
}
