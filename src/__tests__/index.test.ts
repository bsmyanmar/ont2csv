import { splitContent, removeUnwantedWords } from "../index";

test("split the full sentence into complete model", () => {
  const testString: string = "GEN.1.10 Hello";
  expect(splitContent(testString)).toMatchObject({
    bibleCode: "GEN",
    chapterNumber: 1,
    verseNumber: "10",
    content: "Hello",
  });
});

test("split the partial content into partial model", () => {
  const testString: string = "GEN.1.10 ";
  expect(splitContent(testString)).toMatchObject({
    bibleCode: "GEN",
    chapterNumber: 1,
    verseNumber: "10",
    content: "",
  });
});

test("remove unwanted words in the content", () => {
  const testString: string =
    "Pathumnak tipi min cu Taigris a ii ih Assiria nisuahnakla ah a luang. Cun a palinak cu Zufrates<RF>2:14 Zufrates Zufreiṭis tiih rel thok.<Rf> a ii. <CM>";
  expect(removeUnwantedWords(testString)).toBe("Pathumnak tipi min cu Taigris a ii ih Assiria nisuahnakla ah a luang. Cun a palinak cu Zufrates a ii.");
});
