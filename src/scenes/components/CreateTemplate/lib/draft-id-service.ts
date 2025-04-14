const DRAFT_ID_KEY = 'draft-id';

class DraftStorage {
  draftId: string | null;

  constructor() {
    this.draftId = localStorage.getItem(DRAFT_ID_KEY);
  }

  getId = () => this.draftId;

  setId = (key: string) => localStorage.setItem(DRAFT_ID_KEY, key);

  deleteId = () => localStorage.removeItem(DRAFT_ID_KEY);
}

export const DraftIdService = new DraftStorage();
