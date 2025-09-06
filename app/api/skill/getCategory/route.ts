import { NextRequest, NextResponse } from 'next/server';

import { GETSkillCategoryPosts, GETAllSkillCategoryPosts } from '@/service/skill';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('categoryId');

  if (!category) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }

  const categoryId = Number(category);

  // Fetch category data from the database or another API
  const categoryData = await GETSkillCategoryPosts(categoryId);

  if (!categoryData) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  try {
    const categoryId = Number(category);
    if (categoryId === 0) {
      return NextResponse.json(await GETAllSkillCategoryPosts());
    } else {
      return NextResponse.json(await GETSkillCategoryPosts(categoryId));
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
