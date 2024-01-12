'use client';

import StyledComponentsRegistry from '@/lib/styled';
import React, { useEffect, useState } from 'react';

import '../globals.scss';
import styled from 'styled-components';
import cx from 'clsx';

const Input = styled('input')`
  background: transparent;
  &.noValue {
    color: white;
  }

  animation: marquee 5s linear infinite;

  &.editing,
  &:focus,
  &:hover,
  &:active {
    outline: none;
    animation: none;
  }

  &::selection {
    background: #fff5b2;
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: red;
  font-size: 3rem;
  border: none;
  text-align: center;
  font-weight: bolder;
  text-transform: uppercase;
  border-radius: 0;
  width: 120vw;
`;

const Body = styled(`body`)`
  overscroll-behavior: none;
  max-height: 10px;
  background: transparent;
  width: 100vw;
  &.noValue {
    user-select: none;
  }
`;

const DEFAULT_MSG = 'KEEP FOCUSED';

declare global {
  const ipcRenderer: typeof import('electron/renderer').ipcRenderer;
}

export default function RootLayout({}: { children: React.ReactNode }) {
  const [value, setValue] = useState(DEFAULT_MSG);
  const [editing, setEditing] = useState(false);
  const [inputRef, setInputRef] = useState<null | HTMLInputElement>(null);
  const noValue = !value;

  useEffect(() => {
    let tm: any;
    ipcRenderer.on('command+i', () => {
      tm = setTimeout(() => {
        setEditing((e) => !e);
        if (!inputRef) return;
        inputRef.focus();
        inputRef.setSelectionRange(0, -1);
      }, 100);
    });

    return () => {
      clearTimeout(tm);
      ipcRenderer.removeAllListeners('command+i');
    };
  }, []);

  return (
    <html>
      <StyledComponentsRegistry>
        <Body
          className={cx({ noValue, editing })}
          onMouseEnter={() => {
            if (!editing) {
              ipcRenderer.send('goToPosition');
            }
          }}
        >
          <main style={{ paddingTop: '30px' }}>
            <Input
              ref={setInputRef}
              value={value}
              onChange={(ev) => setValue(ev.target.value.toUpperCase())}
              className={cx({ noValue: !value, editing })}
              onDoubleClick={(ev) => ev.preventDefault()}
              onBlur={() => {
                setEditing(false);
                inputRef.setSelectionRange(null, null);
              }}
            />
          </main>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
