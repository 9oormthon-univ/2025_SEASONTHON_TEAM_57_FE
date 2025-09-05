import BottomButton from '@/components/button/bottomButton';

export default async function DebugPage() {
  const fetchData = async () => {
    const res = await fetch('http://43.202.29.134:8080/api/v1/test/ping');
    const data = await res.text();
    return data;
  };
  const data = await fetchData();

  return (
    <>
      {data}
      <form action="">
        <BottomButton
          button={{ buttonText: '테스트용' }}
          modal={{
            title: '테스트용 모달입니다.',
            loadingText: '로딩중입니다.',
            formId: 'testForm',
          }}
        />
      </form>
    </>
  );
}
