import { createSkill } from './actions';
import SkillUploadPage from './SkillUploadPage';

export default function Page() {
  return <SkillUploadPage action={createSkill} />;
}
