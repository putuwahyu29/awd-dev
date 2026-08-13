import ProjectDetailPage, { generateMetadata, generateStaticParams } from '../../projects/[slug]/page';

export const revalidate = 3600;
export const dynamicParams = true;
export { generateMetadata, generateStaticParams };
export default ProjectDetailPage;
