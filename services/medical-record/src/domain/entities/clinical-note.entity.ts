import type { ISODateString, UUID } from '@medsphere/shared';

export interface ClinicalNoteProps {
  id: UUID;
  organizationId: UUID;
  recordId: UUID;
  authorId: UUID;
  content: string;
  noteType: string;
  recordedAt: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class ClinicalNote {
  private readonly props: ClinicalNoteProps;

  private constructor(props: ClinicalNoteProps) {
    this.props = { ...props };
  }

  static create(props: ClinicalNoteProps): ClinicalNote {
    return new ClinicalNote(props);
  }

  static record(input: Omit<ClinicalNoteProps, 'createdAt' | 'updatedAt'> & { now: ISODateString }): ClinicalNote {
    return new ClinicalNote({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  get recordId(): UUID {
    return this.props.recordId;
  }

  get authorId(): UUID {
    return this.props.authorId;
  }

  get content(): string {
    return this.props.content;
  }

  get noteType(): string {
    return this.props.noteType;
  }

  get recordedAt(): ISODateString {
    return this.props.recordedAt;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): ClinicalNoteProps {
    return { ...this.props };
  }
}
