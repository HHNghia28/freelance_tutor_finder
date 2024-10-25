import { Box, Link, Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { toSlug } from 'src/utils/slug';

import { Image } from 'src/components/image';

const DATA = [
  {
    image:
      'https://i1-giadinh.vnecdn.net/2024/10/17/775115567849d71f30f3fcd901a596-7711-4100-1729133712.png?w=500&h=300&q=100&dpr=1&fit=crop&s=cU7Ov7OSPQDY6ikTXdy1Fg',
    title: 'Lò luyện thi vào Harvard',
    shortDesc:
      'Từ đầu kỳ nghỉ hè 2024, 7 đứa trẻ 11 tuổi từ Australia, Anh, Thụy Sĩ bay đến New York để gặp Jamie Beaton - một cố vấn đại học mà chúng tin sẽ giúp vào được Harvard.',
  },
  {
    image:
      'https://i1-giadinh.vnecdn.net/2024/06/06/hotro22-1717642902-3311-1717644884.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=FklZ9o7pj_EefVSi7ZdpZA',
    title: "Nghề 'siêu gia sư' ở Trung Quốc",
    shortDesc:
      'Không chỉ kèm cặp việc học, gia sư còn đồng hành trong nhiều hoạt động khác và nhận mức lương có thể lên 60.000 tệ một tháng (210 triệu đồng). ',
  },
  {
    image:
      'https://i1-giadinh.vnecdn.net/2023/11/26/anhvochong44-1700969808-7351-1700973318.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=POkTDNDRDOZ2tvsimFrgUA',
    title: 'Chuyện tình cô gái nghèo và chàng gia sư',
    shortDesc:
      'TP HCM - Hai năm yêu thầm, bằng chiêu "mưa dầm thấm lâu" Đính đã đánh bật những bóng hồng trường Y khác để có được trái tim chàng bác sĩ trẻ.',
  },
  {
    image:
      'https://i1-vnexpress.vnecdn.net/2023/08/08/huongdanhocthiieltschong390935-8784-5706-1691478161.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=zJ3ZRbfLfYkJbmo3OR6KLw',
    title: 'Gia sư có quyền không cho phụ huynh đăng video dạy học?',
    shortDesc:
      'Nhà học sinh tôi đến dạy IELTS có lắp camera. Hết khóa học, phụ huynh đăng video buổi dạy lên mạng khiến tôi không thoải mái nên yêu cầu gỡ.',
  },
  {
    image:
      'https://i1-giadinh.vnecdn.net/2022/07/31/hoc-them-1-5462-1659122355-165-6053-5648-1659208096.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=FGEOGih3b7Ldnz7ocr2ZIA',
    title: 'Học hè chui',
    shortDesc:
      'Trung Quốc - Hè năm nay, Mingyu (12 tuổi) có một khóa tiếng Anh, hai lớp Toán, một lớp Vật lý, chưa kể các buổi học ở ba trung tâm khác. Tất cả các lớp này đều dạy chui. ',
  },
];

export default function NewsList() {
  return (
    <Stack spacing={3} divider={<Divider />}>
      {DATA.map((news) => (
        <Stack
          key={news.image}
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box sx={{ position: 'relative', flexShrink: 0, maxWidth: 240 }}>
            <Image src={news.image} alt={news.title} ratio="5/3" />
          </Box>
          <Box sx={{ flex: 1, ml: 1 }}>
            <Link
              component={RouterLink}
              href={paths.guest.news.details(toSlug(news.title))}
              variant="h5"
              sx={{ color: 'text.primary' }}
            >
              {news.title}
            </Link>
            <Typography variant="body2">{news.shortDesc}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
