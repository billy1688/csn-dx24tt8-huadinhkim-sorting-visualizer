(function exposeSortingTheory(global) {
  "use strict";

  const algorithms = {
    bubble: {
      symbol: "B",
      keyword: "Nổi",
      memory: "So đôi kề nhau – số lớn nổi dần về cuối.",
      concept:
        "Bubble Sort duyệt mảng nhiều lượt. Mỗi lượt so sánh hai phần tử đứng cạnh nhau và đổi chỗ nếu chúng sai thứ tự.",
      analogy:
        "Hãy tưởng tượng bọt khí lớn dần nổi lên mặt nước: sau mỗi lượt, phần tử lớn nhất còn lại đi về cuối mảng.",
      steps: [
        "Bắt đầu từ đầu mảng.",
        "So sánh A[j] với A[j + 1].",
        "Đổi chỗ nếu phần tử bên trái lớn hơn.",
        "Tiếp tục đến cuối đoạn chưa sắp xếp.",
        "Lặp lại; dừng sớm nếu một lượt không có đổi chỗ.",
      ],
      recognition: [
        "Luôn so sánh hai vị trí liền kề j và j + 1.",
        "Có nhiều lần đổi chỗ nhỏ trên một lượt.",
        "Vùng đã sắp xếp tăng dần từ cuối mảng.",
      ],
      confusion:
        "Selection Sort tìm phần tử nhỏ nhất rồi thường chỉ đổi chỗ một lần mỗi lượt; Bubble Sort đổi chỗ nhiều cặp kề nhau.",
      stable: "Có",
      inPlace: "Có",
      suitable: "Mảng nhỏ hoặc gần tăng dần khi có tối ưu dừng sớm.",
    },
    selection: {
      symbol: "S",
      keyword: "Chọn",
      memory: "Chọn số nhỏ nhất – đặt vào đầu đoạn chưa sắp xếp.",
      concept:
        "Selection Sort chia mảng thành đoạn đã sắp xếp ở bên trái và đoạn chưa sắp xếp ở bên phải. Mỗi lượt chọn phần tử nhỏ nhất của đoạn bên phải.",
      analogy:
        "Giống như nhìn toàn bộ nhóm còn lại, chọn người thấp nhất và đưa người đó vào vị trí đầu tiên còn trống.",
      steps: [
        "Xem vị trí đầu đoạn chưa sắp xếp là vị trí nhỏ nhất.",
        "Duyệt toàn bộ phần còn lại để tìm giá trị nhỏ hơn.",
        "Ghi nhớ vị trí minIndex.",
        "Đổi phần tử nhỏ nhất với vị trí đầu đoạn.",
        "Dịch ranh giới đoạn đã sắp xếp sang phải.",
      ],
      recognition: [
        "Có biến minIndex để ghi nhớ phần tử nhỏ nhất.",
        "Mỗi lượt vẫn quét hết đoạn chưa sắp xếp.",
        "Thường chỉ có tối đa một lần đổi chỗ mỗi lượt.",
      ],
      confusion:
        "Bubble Sort so sánh và đổi các cặp kề nhau; Selection Sort tìm xong phần tử nhỏ nhất rồi mới đổi chỗ.",
      stable: "Không",
      inPlace: "Có",
      suitable: "Khi muốn hạn chế số lần đổi chỗ và dữ liệu có kích thước nhỏ.",
    },
    insertion: {
      symbol: "I",
      keyword: "Chèn",
      memory: "Rút một lá bài – chèn vào đúng chỗ bên trái.",
      concept:
        "Insertion Sort xây dựng dần một đoạn đã sắp xếp ở bên trái. Mỗi phần tử mới được lấy ra và chèn vào vị trí phù hợp trong đoạn đó.",
      analogy:
        "Giống cách xếp bài trên tay: lấy một lá mới, dịch các lá lớn hơn sang phải rồi đặt lá mới vào chỗ trống.",
      steps: [
        "Coi phần tử đầu tiên đã được sắp xếp.",
        "Lấy phần tử kế tiếp làm key.",
        "So sánh key với các phần tử bên trái.",
        "Dịch các phần tử lớn hơn key sang phải.",
        "Chèn key vào vị trí trống và tiếp tục.",
      ],
      recognition: [
        "Có biến key giữ phần tử đang chèn.",
        "Các phần tử lớn hơn được dịch sang phải.",
        "Đoạn bên trái luôn có thứ tự sau mỗi lượt.",
      ],
      confusion:
        "Selection Sort đi tìm số nhỏ nhất của toàn bộ đoạn còn lại; Insertion Sort chỉ lấy phần tử hiện tại rồi chèn vào đoạn bên trái.",
      stable: "Có",
      inPlace: "Có",
      suitable: "Mảng nhỏ, gần tăng dần hoặc dữ liệu được bổ sung từng phần tử.",
    },
    merge: {
      symbol: "M",
      keyword: "Trộn",
      memory: "Chia đôi – sắp từng nửa – trộn lại theo thứ tự.",
      concept:
        "Merge Sort dùng chiến lược chia để trị: chia mảng đến khi mỗi đoạn chỉ còn một phần tử, sau đó trộn các đoạn đã có thứ tự.",
      analogy:
        "Giống trộn hai chồng bài đã xếp: luôn lấy lá nhỏ hơn ở đầu hai chồng đưa vào chồng kết quả.",
      steps: [
        "Chia mảng thành hai nửa.",
        "Tiếp tục chia đệ quy từng nửa.",
        "So sánh phần tử đầu của hai nửa đã sắp xếp.",
        "Đưa phần tử nhỏ hơn vào mảng tạm.",
        "Chép phần còn lại và ghi kết quả về mảng chính.",
      ],
      recognition: [
        "Có bước chia theo vị trí middle.",
        "Dùng hai con trỏ để trộn hai nửa.",
        "Cần mảng tạm để lưu kết quả trộn.",
      ],
      confusion:
        "Merge Sort chia đều theo vị trí rồi bắt buộc trộn lại; Quick Sort chia theo giá trị chốt và không có bước trộn.",
      stable: "Có",
      inPlace: "Không",
      suitable: "Dữ liệu lớn, cần thời gian ổn định O(n log n) hoặc cần giữ thứ tự phần tử bằng nhau.",
    },
    quick: {
      symbol: "Q",
      keyword: "Chốt",
      memory: "Chọn một chốt – nhỏ sang trái, lớn sang phải.",
      concept:
        "Quick Sort chọn một phần tử làm pivot, phân hoạch dữ liệu thành hai phía rồi tiếp tục sắp xếp đệ quy từng phía.",
      analogy:
        "Giống chọn một người làm mốc chiều cao: người thấp hơn đứng bên trái, người cao hơn đứng bên phải.",
      steps: [
        "Chọn pivot; chương trình hiện tại chọn phần tử cuối.",
        "Duyệt đoạn và đưa các giá trị nhỏ hơn hoặc bằng pivot sang trái.",
        "Đặt pivot vào đúng vị trí phân cách.",
        "Sắp xếp đệ quy phần bên trái pivot.",
        "Sắp xếp đệ quy phần bên phải pivot.",
      ],
      recognition: [
        "Có phần tử pivot và thao tác partition.",
        "Sau phân hoạch, pivot đã ở đúng vị trí.",
        "Không cần trộn hai nửa sau đệ quy.",
      ],
      confusion:
        "Merge Sort chia theo giữa mảng và dùng mảng tạm để trộn; Quick Sort chia theo pivot và có thể gặp O(n²) nếu chọn pivot không phù hợp.",
      stable: "Không",
      inPlace: "Có, trừ stack",
      suitable: "Sắp xếp mảng trong bộ nhớ với tốc độ trung bình tốt; nên chọn pivot phù hợp.",
    },
  };

  global.SortingTheory = algorithms;
})(window);
