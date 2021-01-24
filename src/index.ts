type BibleContentModel = {
  bibleCode: string[];
  chapterNumber: number;
  verseContent: string;
  verseNumber: string; // string because there will be like this: "10-16"
  content: string;
};

export const splitContent = (text: string) => {
  const str: string[] = text.split(".");
  const bibleCode: string = str[0];
  const chapterNumber: number = parseInt(str[1]);
  const captureGroup: string[] = str[2].split(/(\d{1,})(.+)/);
  const verseNumber: string = captureGroup[1].trimEnd(); //[1] means first capturing group
  const content: string = captureGroup[2]?.trim(); // [2] means second capturing group
  return {
    bibleCode,
    chapterNumber,
    verseNumber,
    content,
  };
};

export const removeUnwantedWords = (text: string) => {
  /**
   * <CM> = new line
   * <TS1><PI1> ... <Ts> = heading
   * <CI><PI2> .... = new line + 2 tab
   * <CI><PI1> ... = new line + 1 tab
   * <CL> = \m in paratext ??
   * <RF> ... <Rf> = \f ...\f* = reference
   *
   */
  const regex: RegExp[] = [
    new RegExp(/<CM>/g),
    new RegExp(/<TS\d><PI\d>(.*?)<Ts>/g),
    new RegExp(/<CI><PI\d>/g),
    new RegExp(/<CL>/g),
    new RegExp(/<RF>(.*?)<Rf>/g),
  ];
  let temp: string = text;
  regex.forEach((r) => {
    temp = temp.replace(r, "");
  });
  return temp.trim();
};
