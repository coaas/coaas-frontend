import { FC } from 'react';
import { TeamMemberCard } from '@components/TeamMemberCard';
import { useProjectTeam } from './useProjectTeam';

export const ProjectTeam: FC = () => {
  const { data, isLoading, error } = useProjectTeam();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stroke-blue"></div>
          <p className="text-gray text-sm">Loading project team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-error">Error loading project team</div>
      </div>
    );
  }

  const members = data?.members || [];

  return (
    <div className="min-h-screen bg-background">
      <section className="w-full m-auto max-w-[1268px] py-[70px] px-3.5">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Project Team</h1>
            <p className="text-gray mt-1">Team members: {members.length}</p>
          </div>

          {members.length === 0 ? (
            <div className="text-center text-gray min-h-64 flex items-center justify-center">
              <div className="bg-area-dark rounded-lg p-8 border border-stroke-gray-dark">
                <p className="text-lg">No team members yet</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
              {members.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
