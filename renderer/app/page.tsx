'use client';

import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ms } from 'powership';

const SIX_MINUTES = ms('6minutes');

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Text = styled.textarea`
  width: 100%;
  height: 200px;
  background: var(--color-background);
  border: none;
  outline: none;
  color: var(--color-text);
  border-radius: 5px;
  overflow: hidden;
  padding: 16px;
  font-size: 16px;
  background: #3d3f41;
  font-family: 'Helvetica Neue', sans-serif;
`;

let endTime = Date.now() + SIX_MINUTES;

function play() {
  endTime = Date.now();
  global.ipcRenderer.send('showQuote');
}

export default function Page(props: PageProps) {
  const { className } = props;

  useEffect(() => {
    let t1 = setTimeout(() => {
      play();
    }, SIX_MINUTES);

    return () => {
      clearTimeout(t1);
    };
  }, []);

  return (
    <PageWrapper className={className}>
      {/*<Clock />*/}
      {/*<Text autoFocus></Text>*/}
    </PageWrapper>
  );
}

const ClockWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83afff;
  color: #1d1d1f;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px auto;
`;

function Clock() {
  const [time, setTime] = useState(() => 0);

  useEffect(() => {
    const t1 = setInterval(() => {
      const seconds = (endTime - Date.now()) / 1000;
      setTime(seconds);
    }, 1000);

    return () => {
      clearInterval(t1);
    };
  }, []);

  return (
    <ClockWrapper>
      <h1>⌛️{fancyTimeFormat(time)}</h1>
    </ClockWrapper>
  );
}

function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
}

export type PageProps = {
  className?: string;
  children?: React.ReactNode;
};
