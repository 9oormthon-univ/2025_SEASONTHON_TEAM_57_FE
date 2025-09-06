'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useMemo, useState } from 'react';

import ShadowBox from '@/components/shadow';
import type { CertificatingType } from '@/service/interfaces';

import LeftArrow from '@icons/arrow/left.svg';
import RightArrow from '@icons/arrow/right.svg';
import CloseIcon from '@icons/x.svg';

import type { Props } from '../(main)/challengeMain';

dayjs.locale('ko');

export default function DateCalendar({ action }: Props) {
  // ───────── UI 상태 ─────────
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // 접힘/펼침
  const [showYearModal, setShowYearModal] = useState<boolean>(false); // 연도 선택 모달

  // ───────── 날짜 상태 ─────────
  const [today, setToday] = useState<Dayjs>(dayjs()); // 기준(앵커) 날짜
  const [selectedDate, setSelectedDate] = useState<[string, number, Dayjs]>([
    dayjs().format('YYYY-MM-DD'),
    0,
    dayjs(),
  ]);

  // 서버 데이터
  const [calendarDataFetched, setCalendarData] = useState<CertificatingType[] | null>(null);

  // ───────── 상수 ─────────
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const pastYear = currentDate.subtract(200, 'year').year();

  const years: number[] = useMemo(() => {
    const ys: number[] = [];
    for (let y = currentYear; y >= pastYear; y--) ys.push(y);
    return ys;
  }, [currentYear, pastYear]);

  const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'] as const;

  // ───────── 월 뷰 데이터 ─────────
  interface DateWithStatus {
    date: Dayjs;
    status: string[];
  }

  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = dayjs(today).startOf('month').locale('en');

  const dates: DateWithStatus[] = useMemo(() => {
    const arr: DateWithStatus[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = dayjs(firstDayOfMonth).add(i - 1, 'day');
      arr.push({ date: d, status: ['point'] });
    }
    return arr;
  }, [daysInMonth, firstDayOfMonth]);

  const emptyDates = useMemo(() => new Array(firstDayOfMonth.day()).fill(null), [firstDayOfMonth]);
  const calenderData: Array<null | DateWithStatus> = useMemo(
    () => [...emptyDates, ...dates],
    [emptyDates, dates]
  );

  // ───────── 주 뷰 데이터 (today가 속한 주: 일~토) ─────────
  const weekStart = today.subtract(today.day(), 'day');
  const weekData: DateWithStatus[] = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        date: weekStart.add(i, 'day'),
        status: ['point'],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [today.valueOf()]
  );

  // ───────── 이동/선택 ─────────
  const onClickPast = () => {
    setToday(prev => (isExpanded ? prev.subtract(1, 'month') : prev.subtract(1, 'week')));
  };
  const onClickNext = () => {
    setToday(prev => (isExpanded ? prev.add(1, 'month') : prev.add(1, 'week')));
  };

  const onClickChangeYear = (year: number) => {
    setToday(dayjs(today).set('year', year));
    setShowYearModal(false);
  };

  const onClickChangeDate = (item: DateWithStatus, indexLike: number) => {
    setSelectedDate([item.date.format('YYYY-MM-DD'), indexLike, item.date]);
  };

  const toggleYearModal = () => setShowYearModal(v => !v);
  const closeYearModal = () => setShowYearModal(false);

  // ───────── 데이터 로드 (월 단위) ─────────
  useEffect(() => {
    const run = async () => {
      const res = await action({ year: today.year(), month: today.month() + 1 });
      // any 금지: 배열 타입 가드
      const arr = Array.isArray(res) ? (res as CertificatingType[]) : null;
      setCalendarData(arr);
    };
    run();
  }, [action, today]);

  // 해당 날짜에 기록 여부
  const hasDot = (d: Dayjs): boolean =>
    Array.isArray(calendarDataFetched) &&
    calendarDataFetched.some(item => item.date === d.format('YYYY-MM-DD'));

  return (
    <ShadowBox>
      {/* Date Calendar */}
      <div className="z-[200]">
        <div className="pb-[12px]">
          {/* 달력의 헤더 */}
          <header
            className={clsx(
              'relative',
              !isExpanded ? '!pt-[6px] !pb-[6px]' : 'pt-[18px] pb-[15px]'
            )}
          >
            {isExpanded && (
              <>
                <div className="relative flex px-[1.2rem] justify-between">
                  {/* 이전 */}
                  <div className="left-4">
                    <button
                      type="button"
                      onClick={onClickPast}
                      aria-label="prev"
                    >
                      <LeftArrow />
                    </button>
                  </div>

                  {/* 연·월: 접혔을 때 숨김 */}

                  <div
                    onClick={toggleYearModal}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="ml-[7px] h3 text-active font-bold text-center leading-[15px]">
                      {today.format('MMMM YYYY')}
                    </span>
                  </div>

                  {/* 다음 */}
                  <div className="right-4">
                    <button
                      type="button"
                      onClick={onClickNext}
                      aria-label="next"
                    >
                      <RightArrow />
                    </button>
                  </div>
                  {/* 연도 변경 모달 (펼침 상태에서만) */}
                  {showYearModal && (
                    <section className="absolute top-[55px] left-0 z-[201] bg-[#fff] border-[1px] w-[330px] h-[280px] p-6 rounded-[15px]">
                      <ul
                        id="scrollbar-hidden"
                        className="w-full h-[200px] flex flex-row flex-wrap overflow-y-scroll"
                      >
                        {years.map(year => (
                          <li
                            key={year}
                            onClick={() => onClickChangeYear(year)}
                            className={`w-[25%] h-[30px] flex flex-row justify-center items-center text-lg text-gray-600 cursor-pointer
                        ${
                          String(year) === today.format('YYYY')
                            ? 'bg-black text-white'
                            : 'hover:font-bold hover:bg-gray-200 hover:text-black '
                        }`}
                          >
                            {year}
                          </li>
                        ))}
                      </ul>

                      {/* 연도 모달 닫기 */}
                      <div className="flex flex-row justify-end pt-2">
                        <button
                          type="button"
                          onClick={closeYearModal}
                          aria-label="close year modal"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </>
            )}

            {/* 요일 */}
            <ul
              className={clsx(
                'flex flex-row justify-around px-[3.5px] pb-[4px] text-[12px] font-bold',
                isExpanded ? 'pt-[17px]' : 'pt-[.4rem]'
              )}
            >
              {dayOfTheWeek.map((el, index) => (
                <li
                  key={index}
                  className={`cursor-default w-[14.28%] body2 text-center ${
                    el === '일' ? 'text-[#FF0000]' : el === '토' ? 'text-active' : 'text-sub'
                  }`}
                >
                  {el}
                </li>
              ))}
            </ul>
          </header>

          {/* 날짜 표시 (애니메이션 컨테이너) */}
          <div
            className="px-[3.5px] overflow-hidden transition-[max-height] duration-300"
            style={{ maxHeight: isExpanded ? 1000 : 84 }} // 접힘 높이는 1주 라인에 맞춤
          >
            {/* 펼침: 월 뷰 */}
            {isExpanded ? (
              <main>
                <ul className="flex flex-row flex-wrap">
                  {calenderData.map((date, index) => (
                    <li
                      key={index}
                      className="w-[14.28%] mt-[11px]"
                    >
                      {date !== null && (
                        <div className="relative flex flex-col items-center">
                          <div
                            id="calendar-day"
                            onClick={() => onClickChangeDate(date, index - emptyDates.length + 1)}
                            className={clsx(
                              'cursor-pointer flex justify-center items-center body2 w-[38px] aspect-square rounded-[.8rem]',
                              date.date.day() === 0 ? '!text-[#FF0000]' : '',
                              date.date.isSame(dayjs(), 'day') ? '!text-secondary' : '',
                              selectedDate &&
                                selectedDate[0] === date.date.format('YYYY-MM-DD') &&
                                '!text-white bg-secondary'
                            )}
                          >
                            {date.date.format('D')}
                          </div>

                          {/* 점(기록) */}
                          <div className="flex mt-[5px] h-[6px] gap-[3px]">
                            {calendarDataFetched &&
                              calendarDataFetched.length > 0 &&
                              calendarDataFetched.map((item, idx) => (
                                <div
                                  key={idx}
                                  className={clsx(
                                    'h-[6px] aspect-square rounded-full',
                                    item.date === date.date.format('YYYY-MM-DD') &&
                                      item.totalCont === 1
                                      ? 'bg-[#FFE6E1]'
                                      : item.totalCont === 2
                                      ? 'bg-[#FFC4B7]'
                                      : item.totalCont === 3
                                      ? 'bg-[#FF8E77]'
                                      : 'bg-[#FF7052]'
                                  )}
                                />
                              ))}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </main>
            ) : (
              // 접힘: 주 뷰
              <main>
                <ul className="flex flex-row flex-wrap">
                  {weekData.map((date, index) => (
                    <li
                      key={date.date.format('YYYY-MM-DD')}
                      className="w-[14.28%] mt-[11px]"
                    >
                      <div className="relative flex flex-col items-center">
                        <div
                          id="calendar-day"
                          onClick={() => onClickChangeDate(date, index + 1)}
                          className={clsx(
                            'cursor-pointer flex justify-center items-center body2 w-[38px] aspect-square rounded-[.8rem]',
                            date.date.day() === 0 ? '!text-[#FF0000]' : '',
                            date.date.isSame(dayjs(), 'day') ? '!text-secondary' : '',
                            selectedDate &&
                              selectedDate[0] === date.date.format('YYYY-MM-DD') &&
                              '!text-white bg-secondary'
                          )}
                        >
                          {date.date.format('D')}
                        </div>

                        {/* 점(기록) */}
                        <div className="flex mt-[5px] h-[6px] gap-[3px]">
                          {calendarDataFetched &&
                            calendarDataFetched.length > 0 &&
                            calendarDataFetched.map((item, idx) => (
                              <div
                                key={idx}
                                className={clsx(
                                  'h-[6px] aspect-square rounded-full',
                                  item.date === date.date.format('YYYY-MM-DD') &&
                                    item.totalCont === 1
                                    ? 'bg-[#FFE6E1]'
                                    : item.totalCont === 2
                                    ? 'bg-[#FFC4B7]'
                                    : item.totalCont === 3
                                    ? 'bg-[#FF8E77]'
                                    : 'bg-[#FF7052]'
                                )}
                              />
                            ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </main>
            )}
          </div>

          {/* 모달 하단 */}
          <section className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(v => !v)}
              className="text-gray2 w-full pt-[1.2rem]"
            >
              {isExpanded ? '접기' : '펼치기'}
            </button>
          </section>
        </div>
      </div>

      {/* DateCalendar 외부 영역: 연도 모달 닫기 */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[199]"
        style={{ display: showYearModal ? 'block' : 'none' }}
        onClick={closeYearModal}
      />
    </ShadowBox>
  );
}
