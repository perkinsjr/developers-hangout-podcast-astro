import { useMemo } from 'react';

import { useAudioPlayer } from './AudioProvider';
import { Container } from './Container';
import { FormattedDate } from './FormattedDate';

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  );
}

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published);

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type
      },
      link: `/${episode.itunes_episode}`
    }),
    [episode]
  );
  let player = useAudioPlayer(audioPlayerData);

  return (
    <article
      aria-labelledby={`episode-${episode.itunes_episode}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.itunes_episode}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <a href={`/${episode.itunes_episode}`}>{episode.title}</a>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 w-full overflow-hidden text-base leading-7 text-slate-700 ">
            {episode.itunes_summary}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`${player?.playing ? 'Pause' : 'Play'} episode ${
                episode.title
              }`}
            >
              <PlayPauseIcon
                playing={player?.playing}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <a
              href={`/${episode.itunes_episode}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}

export const Home = ({ episodes }) => {
  return (
    <>
      <head>
        <title>Developers Hangout - Where Developers come to chat!</title>
        <meta
          name="description"
          content="Conversations with developers about things that aren't always development"
        />
      </head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map(episode => (
            <EpisodeEntry key={episode.itunes_episode} episode={episode} />
          ))}
        </div>
      </div>
    </>
  );
};