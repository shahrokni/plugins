// Copyright 2024 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { screen } from '@testing-library/dom';
import { render, RenderResult } from '@testing-library/react';
import { otlptracev1 } from '@perses-dev/core';
import * as exampleTrace from '../../test/traces/example_otlp.json';
import { getTraceModel } from '../trace';
import { SpanName, SpanNameProps } from './SpanName';
import { GanttTableProvider } from './GanttTableProvider';

describe('SpanName', () => {
  const trace = getTraceModel(exampleTrace as otlptracev1.TracesData);
  const renderComponent = (props: Omit<SpanNameProps, 'nameColumnWidth'>): RenderResult => {
    return render(
      <GanttTableProvider>
        <SpanName {...props} nameColumnWidth={25} />
      </GanttTableProvider>
    );
  };

  it('render span name without error', () => {
    renderComponent({ span: trace.rootSpans[0]!.childSpans[0]!.childSpans[0]! });
    expect(screen.getByText('testChildSpan3')).toBeInTheDocument();
    expect(screen.queryByText('error')).not.toBeInTheDocument();
  });

  it('render span name with error', () => {
    renderComponent({ span: trace.rootSpans[0]!.childSpans[0]! });
    expect(screen.getByText('testChildSpan2')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
