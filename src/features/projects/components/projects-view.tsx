'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SparkleIcon } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import { FaGithub } from 'react-icons/fa6';
import ProjectsList from '@/features/projects/components/projects-list';
import { useCreateProject } from '@/features/projects/hooks/use-projects';
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import ProjectsCommandDialogue from '@/features/projects/components/projects-command-dialogue';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function ProjectsView() {
  const createProject = useCreateProject();

  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          e.stopPropagation();
          setCommandDialogOpen((prev) => !prev);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ProjectsCommandDialogue
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />
      <div className='flex min-h-screen flex-col items-center justify-center bg-sidebar p-6 md:p-16'>
        <div className='mx-auto flex w-full max-w-sm flex-col items-center gap-4'>
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='group/logo flex w-full items-center gap-2'>
              <Image
                src='/icon.svg'
                alt='Logo'
                className='size-8 md:size-11.5'
                width={32}
                height={32}
              />
              <h1
                className={cn(
                  'text-4xl font-semibold md:text-5xl',
                  font.className,
                )}
              >
                Orion
              </h1>
            </div>
          </div>

          <div className='flex w-full flex-col gap-4'>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                variant='outline'
                onClick={() => {
                  const projectName = uniqueNamesGenerator({
                    dictionaries: [adjectives, animals, colors],
                    separator: '-',
                    length: 3,
                  });
                  createProject({
                    name: projectName,
                  }).then();
                }}
                className='flex h-full flex-col items-start justify-start gap-6 rounded-none border bg-background p-4'
              >
                <div className='flex w-full items-center justify-between'>
                  <SparkleIcon className='size-4' />
                  <div className='flex gap-1'>
                    <Kbd className='border bg-accent'>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd className='border bg-accent'>J</Kbd>
                  </div>
                </div>
                <div>
                  <span className='text-sm'>New</span>
                </div>
              </Button>
              <Button
                variant='outline'
                onClick={() => {}}
                className='flex h-full flex-col items-start justify-start gap-6 rounded-none border bg-background p-4'
              >
                <div className='flex w-full items-center justify-between'>
                  <FaGithub className='size-4' />
                  <div className='flex gap-1'>
                    <Kbd className='border bg-accent'>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd className='border bg-accent'>I</Kbd>
                  </div>
                </div>
                <div>
                  <span className='text-sm'>Import</span>
                </div>
              </Button>
            </div>

            <div>
              <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
