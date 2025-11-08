import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      // Header
      hotline: "Hotline",

      // Navbar
      home: "TRANG CHỦ",
      services: "DỊCH VỤ",
      work: "ANTWORK",
      blog: "BLOG",
      about: "GIỚI THIỆU",
      contact: "LIÊN HỆ",

      // Services Dropdown
      destinationWedding: "Trang Trí Tiệc Cưới Ngoài Trời",
      restaurantWedding: "Trang Trí Sảnh Cưới",
      ancestorCeremony: "Trang Trí Lễ Gia Tiên",
      eventDecor: "Trang Trí Sự Kiện",

      // Hero
      wedding: "Tiệc cưới",
      heroTitle: "Thoả Sức Biến Tấu Tiệc Cưới Trong Mơ",
      readMore: "Xem thêm",

      // Service Cards
      ancestorDecor: "TRANG TRÍ LỄ GIA TIÊN",
      ancestorDesc: "Lễ gia tiên – nơi Ant kết hợp nét truyền thống Việt cùng tinh thần hiện đại theo mong muốn của từng cặp đôi. Nhưng luôn trọn vẹn ý nghĩa và tinh thần phong tục Việt Nam – nơi cảm xúc và sự trang trọng hòa làm một.",
      outdoorDecor: "TRANG TRÍ NGOÀI TRỜI",
      outdoorDesc: "Cùng dâu rể, ANT tạo nên những không gian tiệc cưới ngoài trời đầy cảm xúc – nơi thiên nhiên làm phông nền, và mỗi đám cưới là một bức tranh kể về tình yêu theo cách riêng của hai người.",
      restaurantDecor: "TRANG TRÍ SẢNH CƯỚI",
      restaurantDesc: "Ant giúp bạn thổi hồn vào không gian sảnh cưới, biến nơi ấy thành một lễ đường riêng biệt, nơi mỗi góc nhỏ đều được chăm chút tỉ mỉ để phản chiếu phong cách và cảm xúc của hai bạn.",
      restaurantDesc1: "Biến đổi không gian sảnh cưới vốn có thành lễ đường của riêng bạn",
      eventDecorTitle: "TRANG TRÍ SỰ KIỆN",
      eventDecorDesc: "Từ những buổi tiệc nhỏ đầy yêu thương đến những sự kiện trọng đại trong đời, ANT hân hoan khi được đồng hành cùng bạn, góp phần tạo nên những khoảnh khắc thật đẹp và ý nghĩa.",
      viewDetails: "XEM CHI TIẾT",

      // Stats
      yearsExperience: "NĂM KINH NGHIỆM",
      couplesServed: "CẶP ĐÔI TIN TƯỞNG",

      // Banner
      bannerTitle1: "Nơi cảm hứng của bạn",
      bannerTitle2: "hóa thành nghệ thuật cưới",
      bannerDesc: "Với kinh nghiệm nhiều năm trong lĩnh vực cưới và khả năng sáng tạo linh hoạt, ANT Wedding mang đến những thiết kế trang trí được cá nhân hóa theo cảm hứng và câu chuyện riêng của mỗi cặp đôi. Chúng tôi không chỉ tạo nên một không gian đẹp, mà còn mang đến sự yên tâm trong suốt hành trình chuẩn bị – để ngày cưới thật sự trở thành ký ức trọn vẹn và đáng nhớ nhất.",
      designPackages: "CÁC THIẾT KẾ TIÊU BIỂU",

      // Why Choose Us
      whyChooseUs: "LÝ DO CHỌN ANT WEDDING",
      whyChooseDesc: " Ant Wedding tin rằng mỗi đám cưới đều xứng đáng được thực hiện bằng sự tận tâm, tỉ mỉ\n và tình yêu trọn vẹn như chính câu chuyện của hai bạn.",
      trustedBrand: "TẬN TÂM - THẤU HIỂU - KHÁC BIỆT",
      trustedBrandDesc: "Mỗi concept được tạo nên từ sự thấu hiểu và phong cách riêng của từng cặp đôi — không lặp lại, không rập khuôn. ANT Wedding không chỉ mang đến một buổi tiệc cưới đẹp, mà là không gian kể chuyện bằng hoa, ánh sáng và cảm xúc.",
      professionalProcess: "CHUYÊN NGHIỆP - CHỈN CHU",
      professionalProcessDesc: "Luôn đồng hành cùng dâu rể trong suốt hành trình chuẩn bị, để mọi khoảnh khắc đều diễn ra nhẹ nhàng và trọn vẹn. Từ khâu lên ý tưởng, thiết kế đến thi công, mọi chi tiết đều được đội ngũ ANT chăm chút kỹ lưỡng.",
      highExpertise: "KINH NGHIỆM - AM HIỂU",
      highExpertiseDesc: "Với kinh nghiệm tổ chức rất nhiều tiệc cưới tại các resort, bãi biển và không gian sang trọng, Ant Wedding hiểu rõ từng đặc thù địa điểm. Mang đến cho bạn những giải pháp décor thông minh, phù hợp và hiệu quả nhất. Đảm bảo quy trình làm việc rõ ràng, đúng tiến độ và có chất lượng cao nhất.",

      workSubTitle: "Thỏa sức biến tấu tiệc cưới trong mơ",

      // Footer
      contactUs: "Contact us",
      ourPhone: "Our phone number:",
      ourEmail: "Our Email:",
      ourAddress: "Our Address:",
      addressDetail: "Chung Cư Ngô Gia Tự - Nha Trang - Khánh Hòa - Việt Nam",
      appointmentNote: "(Vui lòng đặt lịch hẹn trước)",
      followAnt: "FOLLOW ANT",
      followers: "người theo dõi",
      followPage: "Theo dõi trang",
      share: "Chia sẻ",
      tagline: "Ant Wedding – Draw Your Wedding Dream",
      footerNote: "from ANT Wedding with So Much Love",

      // Contact Page
      officeAddress: "Văn phòng",
      nhatrangAddress: "Chung Cư Ngô Gia Tự - Nha Trang - Khánh Hòa - Việt Nam",
      makeAppointment: "(Vui lòng đặt lịch hẹn trước khi đến)",
      contactInfo: "Liên hệ:",
      consultant: "Tư vấn dịch vụ:",
      workingHours: "Giờ làm việc:",
      workingHoursDesc: "Chúng tôi làm việc từ",
      to: "cho đến",
      workingDays: "các ngày trong tuần",
      exceptHolidays: "(Trừ các ngày lễ, tết)",
      afterHoursSupport: "Ngoài giờ làm việc nếu quý khách cần hỗ trợ gấp vui lòng liên hệ số",
      fanpage: "Fanpage",
      followOurPage: "Theo dõi Fanpage của chúng tôi",

      // Portfolio Page
      ourWork: "CÔNG TRÌNH CỦA CHÚNG TÔI",
      portfolioDesc: "Khám phá những không gian tiệc cưới đẹp mắt mà chúng tôi đã tạo nên",
      viewPortfolio: "XEM CHI TIẾT",

      // Portfolio Detail
      concept: "Concept:",
      weddingAddress: "Wedding Address:",
      photographer: "Photographer & Videographer:",
      tags: "Tags:",
      newer: "Newer",
      older: "Older",
      noPrevious: "No Previous",
      noNext: "No Next",

      // Introduce
      helloWeAre: "XIN CHÀO, TỤI MÌNH LÀ ANT WEDDING",
      introTitle1: "Luôn Đổi Mới Sáng Tạo",
      introTitle2: "Uy Tín & Chân Thành",
      // introTitle3: "",
      introDesc: "Từ những ngày đầu, ANT đã tin rằng một lễ cưới không chỉ cần đẹp – mà còn phải kể được câu chuyện của hai người, qua không gian, ánh sáng và từng cành hoa 🌿\n  Với nền tảng thẩm mỹ vững chắc cùng đội ngũ giàu kinh nghiệm, ANT Wedding tự hào là một trong những đơn vị tiên phong trong lĩnh vực Thiết kế & Trang Trí Tiệc Cưới tại Nha Trang nói riêng, Khánh Hòa nói chung và các khu vực lân cận. Chúng tôi cung cấp dịch vụ trọn gói: Lên kế hoạch – Thiết kế – Trang trí – Thi công, để mỗi buổi tiệc đều mang một tinh thần riêng, phản chiếu phong cách và dấu ấn cá nhân của từng cặp đôi.\n Ant Wedding – nơi những giấc mơ cưới được kể lại bằng sự tinh tế, thấu hiểu và chân thành. ✨\n Ngọc Anh & Nhã Tịnh\n Founders of Ant Wedding",
      introQuote: "Cho đến nay, Ant Wedding vẫn luôn tự hào là đơn vị đặt sự thấu hiểu mong muốn của cặp đôi làm trọng tâm – để mỗi lễ cưới đều phản chiếu đúng tinh thần, cảm xúc và giấc mơ mà dâu rể hằng mong.",
      founders: "Ngọc Anh & Nhã Tịnh",
      founderTitle: "Founder Ant Wedding",

      // Service Page
      ourServices: "Dịch Vụ Của Chúng Tôi",
      ourServicesDesc: "Ant Wedding cung cấp đa dạng các dịch vụ trang trí cho mọi sự kiện đặc biệt của bạn",
      trustedBrandDesc2: "Hơn 15 năm kinh nghiệm trong lĩnh vực trang trí tiệc cưới",
      professionalProcessDesc2: "Đội ngũ chuyên nghiệp, tận tâm với quy trình làm việc chặt chẽ",
      highExpertiseDesc2: "Luôn cập nhật xu hướng mới nhất trong lĩnh vực trang trí",
      readyForPerfectWedding: "Sẵn sàng tạo nên ngày cưới hoàn hảo?",
      contactForFreeConsultation: "Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí",

      // About Us Page
      aboutUs: "VỀ CHÚNG TÔI",
      aboutUsTagline: "Ant Wedding Decor - Kiến tạo những khoảnh khắc đáng nhớ",
      ourStory: "Câu Chuyện Của Chúng Tôi",
      ourStoryDesc1: "Ant Wedding Decor được sáng lập bởi Ngọc Anh & Nhã Tịnh – hai người chung niềm đam mê với nghệ thuật trang trí và tình yêu dành cho những khoảnh khắc ý nghĩa trong ngày cưới.",
      ourStoryDesc2: "Bắt đầu từ năm 2019 với một đội ngũ nhỏ, Ant đã dần trưởng thành qua từng dự án, từng câu chuyện tình yêu mà tụi mình có cơ hội đồng hành. Với ANT, mỗi đám cưới không chỉ là một buổi tiệc, mà là một hành trình kể chuyện bằng hoa, ánh sáng và cảm xúc – nơi mọi chi tiết đều được tạo nên bằng sự tận tâm và niềm hạnh phúc thật sự.",
      ourFounders: "Người Sáng Lập",
      coFounderCreativeDirector: "Người Sáng lập & Sáng tạo",
      coFounderOperationsDirector: "Người Sáng lập & Giữ lửa",
      founderDesc1: "Không ngừng khám phá ý tưởng mới và phá vỡ giới hạn sáng tạo, Nhã Tịnh mang đến cho mỗi đám cưới một hơi thở riêng — hiện đại, tinh tế và đầy cảm hứng. Cô luôn tin rằng, mỗi không gian trang trí không chỉ cần đẹp, mà còn phải kể được câu chuyện của hai con người đang yêu nhau.",
      founderDesc2: "Với kinh nghiệm trong quản lý và tổ chức sự kiện, Ngọc Anh là người đứng sau sự chỉn chu và mạch lạc của từng dự án. Từng chi tiết, từng quy trình đều được cô lên kế hoạch tỉ mỉ để đảm bảo mọi đám cưới được diễn ra trọn vẹn — từ ý tưởng đầu tiên đến khoảnh khắc cuối cùng.",
      coreValues: "Giá Trị Cốt Lõi",
      dedicated: "Sự Thấu Hiểu",
      dedicatedDesc: "Chúng mình lắng nghe thật kỹ để mỗi chi tiết đều mang “dấu vân tay” của hai bạn – riêng, thật và ý nghĩa.",
      creative: "Sự Tỉ Mỉ",
      creativeDesc: "Từ bản vẽ đầu tiên đến từng cánh hoa, từng ánh đèn, Ant chăm chút mọi chi tiết bằng trái tim của người yêu cái đẹp.",
      professional: "Sự Đồng Hành",
      professionalDesc: "Luôn có mặt từ những ngày đầu lên ý tưởng đến khi tiệc cưới kết thúc – để dâu rể chỉ việc tận hưởng hạnh phúc của mình.",
      ourTeam: "Đội Ngũ Của Chúng Tôi",
      projectsCompleted: "Dự Án Hoàn Thành",
      yearsOfExperience: "Năm Kinh Nghiệm",
      teamMembers: "Thành Viên",
      customerSatisfaction: "Khách Hài Lòng",
      letUsJoinYou: "Hãy Để Chúng Tôi Đồng Hành Cùng Bạn",
      contactForPlanning: "Liên hệ ngay để được tư vấn và lên kế hoạch cho ngày trọng đại",
      sendConsultationRequest: "Gửi Yêu Cầu Tư Vấn",

      // Service Detail Pages - Common
      aboutService: "Về Dịch Vụ",
      completedProjects: "Các Dự Án Đã Thực Hiện",
      workflowProcess: "Quy Trình Làm Việc",
      consultation: "Tư Vấn",
      consultationDesc1: "Lắng nghe ý tưởng và tư vấn concept phù hợp",
      preparation: "Thiết kế",
      preparationDesc1: "Thiết kế 3D và báo giá chi tiết",
      construction: "Thi Công",
      constructionDesc1: "Thi công và setup tại địa điểm",
      completion: "Hoàn Thiện",
      completionDesc1: "Kiểm tra và bàn giao hoàn hảo",
      needConsultation: "Cần Tư Vấn?",
      contactForDetails: "Liên hệ với chúng tôi để được tư vấn chi tiết",

      // Restaurant Wedding Service
      restaurantFeaturesTitle: "Hạng Mục Trang Trí Sảnh Tiệc Cưới",
      restaurantFeaturesSubTitle: "Mỗi chi tiết trong không gian sảnh tiệc đều được tính toán kỹ, để tạo nên một tổng thể hài hòa, sang trọng và mang đậm dấu ấn riêng của dâu rể.",
      restaurantHallTitle: "Backdrop",
      restaurantHallDesc: "Khu vực backdrop chính là điểm nhấn đầu tiên khi khách bước vào sảnh tiệc — nơi thể hiện phong cách và tinh thần của toàn bộ không gian cưới. Ant thiết kế backdrop vừa hài hòa với tổng thể, vừa đủ nổi bật để ghi dấu ấn trong từng khung hình.",
      restaurantMenuTitle: "Gallery",
      restaurantMenuDesc: "Không chỉ là nơi trưng bày ảnh cưới và lưu giữ lời chúc, bàn gallery còn là không gian nhỏ kể lại hành trình tình yêu của hai bạn. Mỗi chi tiết — từ khung ảnh, hoa đến ánh sáng — đều được Ant sắp đặt tinh tế để câu chuyện trở nên sống động và đầy cảm xúc.",
      restaurantStaffTitle: "Lối đi",
      restaurantStaffDesc: "Một hành trình ngắn nhưng đầy ý nghĩa — nơi dâu rể bước đi giữa những ánh nhìn yêu thương. Ant thiết kế lối đi như một khung cảnh dẫn vào giấc mơ, nơi từng bông hoa, ánh đèn đều hòa cùng nhịp cảm xúc của ngày trọng đại.",
      restaurantDecorConceptTitle: "Sân khấu",
      restaurantDecorConceptDesc: "Là trung tâm của buổi tiệc — nơi cảm xúc thăng hoa và lời hứa được trao gửi. Với sự cân bằng giữa nghệ thuật và cảm xúc, Ant tạo nên một không gian sân khấu sang trọng, tinh tế và đủ gần gũi để mọi khoảnh khắc đều trở nên đáng nhớ.",
      restaurantProcessTitle: "Quy Trình Tổ Chức Tiệc",
      restaurantConsultation: "Tư Vấn",
      restaurantConsultationDesc: "Tư vấn không gian, thực đơn và dịch vụ",
      restaurantPlanning: "Lên Kế Hoạch",
      restaurantPlanningDesc: "Thiết kế concept và báo giá chi tiết",
      restaurantPreparation: "Chuẩn Bị",
      restaurantPreparationDesc: "Chuẩn bị thực đơn và trang trí sảnh",
      restaurantExecution: "Tổ Chức",
      restaurantExecutionDesc: "Phục vụ và điều phối tiệc hoàn hảo",
      restaurantPortfolioTitle: "Không Gian & Khoảnh Khắc",
      restaurantPortfolio1: "TỪ BẠN, CHO ĐẾN BẠN ĐỜI",
      restaurantPortfolio2: "VAN & TUC",
      restaurantPortfolio3: "DUYEN & STEVEN",
      restaurantPortfolio4: "SWEETEST DAY",
      outdoorBenefitsRes: "Tại Sao Nên Tổ Chức Tiệc Cưới Trong Sảnh",
      spaciousSpaceRes: "Không lo về thời tiết — luôn hoàn hảo dù mưa hay nắng",
      spaciousSpaceResDesc: "Tiệc cưới trong sảnh mang lại sự an tâm tuyệt đối, giúp bạn không phải lo lắng về gió, mưa hay nắng. Mọi cảm xúc, âm thanh và ánh sáng đều được kiểm soát tốt nhất để buổi tiệc diễn ra trọn vẹn.",
      naturalLightRes: "Không gian tiện nghi – sang trọng và dễ tùy biến",
      naturalLightResDesc: "Các sảnh tiệc hiện nay được thiết kế với hệ thống ánh sáng, âm thanh, máy lạnh và dịch vụ chuyên nghiệp. Ant có thể biến đổi không gian ấy theo phong cách riêng của từng cặp đôi — từ tinh tế, nhẹ nhàng đến ấn tượng và cá tính.",
      romanticSpaceRes: "Dễ dàng kết nối – thuận tiện cho khách mời",
      romanticSpaceResDesc: "Với vị trí trung tâm và dịch vụ đồng bộ, sảnh tiệc là lựa chọn lý tưởng để người thân, bạn bè dễ dàng di chuyển và tận hưởng trọn vẹn ngày vui. Không cần lo khâu sắp xếp, mọi thứ đều được chuẩn bị chu đáo từ đầu đến cuối.",
      readyForPerfectWeddingRes: "Sẵn Sàng Tạo Nên Tiệc Cưới Hoàn Hảo?",
      contactForFreeConsultationRes: "Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí",

      // Ancestor Service
      ancestorServiceTitle: "Trang Trí Gia Tiên Gồm Những Gì?",
      ancestorServiceSubtitle: "Tạo nên không gian ấm cúng, trang trọng và đậm giá trị văn hoá Việt\n dành riêng cho ngày khởi đầu thiêng liêng của đôi lứa.",
      ancestorServiceSubtitleHero: "Một nghi lễ truyền thống Việt Nam\n đầy cảm xúc tôn vinh những phong tục lâu đời",
      ancestorAltar: "Cổng Hoa",
      ancestorAltarDesc: "Cổng hoa là hình ảnh đầu tiên khách mời nhìn thấy khi bước vào nhà lễ. Như một lời chào trân trọng và ấm áp, hòa quyện giữa hoa, màu sắc và phong cách của tổng thể buổi lễ. Dù mang nét truyền thống hay hiện đại, cổng hoa vẫn là “điểm mở đầu” hoàn hảo cho một ngày trọng đại đầy ý nghĩa.",
      flowersAndFruits: "Backdrop Chính",
      flowersAndFruitsDesc: "Là trung tâm của không gian lễ gia tiên – nơi diễn ra các nghi thức quan trọng và ghi lại nhiều khung hình đáng nhớ. Từng chi tiết trong cách sắp đặt, phối hoa và chọn vật liệu, để khu vực này vừa trang nghiêm, vừa thể hiện được tinh thần riêng của mỗi gia đình.",
      candlesAndIncense: "Bàn Tiếp Hai Họ",
      candlesAndIncenseDesc: "Bàn hai họ là nơi hai bên gia đình cùng nhau chứng kiến nghi lễ và chia sẻ niềm vui chung. Được bố trí trang trọng, hài hòa với tổng thể, đảm bảo tính truyền thống nhưng vẫn mang vẻ ấm cúng và tinh tế — để từng phút giây đoàn tụ đều trọn vẹn ý nghĩa.",
      spaceDecoration: "Bộ Mâm Quả Cưới",
      spaceDecorationDesc: "Là biểu tượng của sự thành kính và gắn kết, mang giá trị truyền thống sâu sắc trong văn hoá cưới Việt Nam.Được sắp xếp và trang trí chỉn chu, tươi mới và đẹp mắt — để mỗi lễ vật đều trở thành lời chúc phúc trọn vẹn gửi đến đôi uyên ương.Trang Trí Gia Tiên Gồm Những Gì?",
      ancestorMeaning: "Ý Nghĩa Của Lễ Gia Tiên",
      honorAncestors: "Tôn Vinh Tổ Tiên",
      honorAncestorsDesc: "Thể hiện lòng biết ơn và tôn kính với tổ tiên, ông bà",
      familyBonding: "Gắn Kết Gia Đình",
      familyBondingDesc: "Kết nối hai gia đình, tạo sự đoàn kết và sum vầy",
      preserveTradition: "Giữ Gìn Truyền Thống",
      preserveTraditionDesc: "Duy trì và phát huy phong tục tốt đẹp của dân tộc",
      necessaryItems: "Các Vật Phẩm Cần Thiết",
      fiveFruitTray: "Mâm Ngũ Quả",
      fiveFruitTrayDesc: "Trái cây tươi ngon, đẹp mắt, tượng trưng cho sự sung túc",
      freshFlowers: "Hoa Tươi",
      freshFlowersDesc: "Hoa sen, hoa cúc trắng hoặc hoa theo mùa, trang trí trang trọng",
      candlesIncense: "Nến & Hương",
      candlesIncenseDesc: "Nến đỏ, hương thơm chất lượng cao, đèn thờ trang nghiêm",
      wineAndTea: "Rượu & Trà",
      wineAndTeaDesc: "Rượu trắng, trà xanh, nước lọc dâng lễ tổ tiên",
      riceAndSalt: "Cơm & Muối",
      riceAndSaltDesc: "Cơm trắng, muối trắng theo phong tục truyền thống",
      votive: "Vàng Mã",
      votiveDesc: "Vàng mã, tiền giấy cúng theo tập tục gia đình",
      needAncestorConsultation: "Cần Tư Vấn Về Lễ Gia Tiên?",
      contactForCustomDetails: "Liên hệ với chúng tôi để được tư vấn chi tiết về phong tục và chuẩn bị",

      // Ancestor Process Steps
      ancestorConsultation: "Tư Vấn",
      ancestorConsultationDesc: "Khảo sát, tìm hiểu phong tục gia đình & tư vấn phương án phù hợp",
      ancestorPreparation: "Thiết Kế",
      ancestorPreparationDesc: "Thiết kế - Lên bản vẽ - Báo giá chi tiết",
      ancestorConstruction: "Thi Công",
      ancestorConstructionDesc: "Setup và thi công tại tư gia",
      ancestorCompletion: "Hoàn Thiện",
      ancestorCompletionDesc: "Kiểm tra & bàn giao hoàn chỉnh",

      //Ancestor Benefit
      ancestorBenefitTitle:"Nét Đẹp Truyền Thống Trong Văn Hoá Cưới Việt Nam",
      ancestorBenefitTitle1:"Bày Tỏ Lòng Biết Ơn",
      ancestorBenefitSubTitle1:"Lễ gia tiên là nghi thức thiêng liêng để đôi uyên ương dâng hương, bày tỏ lòng thành kính với ông bà tổ tiên – những người đã sinh thành, dưỡng dục và phù hộ cho con cháu. Đây là cách thể hiện đạo hiếu và gìn giữ nét đẹp truyền thống trong mỗi gia đình Việt.",
      ancestorBenefitTitle2:"Chính Thức Ra Mắt Hai Họ ",
       ancestorBenefitSubTitle2:"Buổi lễ là dịp trang trọng để cô dâu, chú rể ra mắt hai bên gia đình. Từ đây, hai họ chính thức kết giao, gắn bó và chứng kiến khoảnh khắc hai người nên duyên vợ chồng – mở đầu cho một hành trình mới đầy yêu thương.",
      ancestorBenefitTitle3:"Cầu Chúc Hạnh Phúc & Bình An ",
       ancestorBenefitSubTitle3:"Lễ gia tiên không chỉ là nghi thức, mà còn mang ý nghĩa cầu chúc cho cuộc sống hôn nhân của đôi trẻ luôn hạnh phúc, viên mãn, thuận hòa – được tổ tiên phù hộ và che chở.",
      ancestorBenefitTitle4:"Gìn Giữ & Tiếp Nối ",
       ancestorBenefitSubTitle4:"Trong nhịp sống hiện đại, Lễ gia tiên là sợi dây kết nối giữa truyền thống và hiện tại – giúp thế hệ trẻ hiểu, trân trọng và tiếp nối những giá trị tốt đẹp của văn hoá Việt trong ngày trọng đại của đời mình.",

      // Ancestor Portfolio
      ancestorModernCeremony: "TRAN & TAI",
      ancestorElegantCeremony: "THOA & BINH",
      ancestorElegantCeremony2: "SWEETEST DAY",
      ancestorElegantCeremony3: "VY & KHANG",

      // Ancestor CTA
      ancestorCTATitle: "Bạn Cần Tư Vấn Về Lễ Gia Tiên?",
      ancestorCTASubTitle: "Liên hệ với chúng tôi để được tư vấn chi tiết về phong tục và chuẩn bị",

      // Outdoor/Destination Service
      // Hạng mục trang trí tiệc cưới ngoài trời
      outdoorServiceTitle: "Hạng Mục Trang Trí Tiệc Cưới Ngoài Trời",
      outdoorServiceSubtitle: "Từng hạng mục décor được sắp đặt tinh tế, biến không gian tiệc cưới ngoài trời\n trở thành bức tranh hoàn chỉnh của cảm xúc",
      backdropAndArch: "Backdrop & Cổng Hoa",
      backdropAndArchDesc: "Khu vực tạo nên dấu ấn đầu tiên của tiệc cưới — nơi phong cách của dâu rể được thể hiện trọn vẹn qua từng chi tiết thiết kế và sắc hoa.",
      tablesAndWalkway: "Gallery",
      tablesAndWalkwayDesc: "Không gian lưu lại những lời chúc và kỷ niệm đáng nhớ, nơi câu chuyện tình yêu của dâu rể được thể hiện bằng hình ảnh và cảm xúc chân thật nhất.",
      lighting: "Bàn Tiệc",
      lightingDesc: "Không gian gắn kết cảm xúc – nơi khách mời cùng nâng ly, sẻ chia niềm vui và lưu lại những khoảnh khắc đáng nhớ trong ngày cưới.",
      themeDecoration: "Hoa Cưới",
      themeDecorationDesc: "Mỗi bó hoa cưới là dấu ấn nhỏ nhưng chứa đựng sự chăm chút và tinh tế của cô dâu. Sự cầu kỳ trong từng cánh hoa phản chiếu tình yêu và tâm huyết mà dâu rể gửi gắm vào ngày trọng đại.",
      outdoorBenefits: "Tiệc Cưới Ngoài Trời Sẽ Mang Lại...",
      spaciousSpace: "Không gian tự nhiên,\n cảm xúc chân thật",
      spaciousSpaceDesc: "Tiệc cưới ngoài trời mang đến bầu không khí gần gũi và thoải mái, nơi ánh sáng tự nhiên, gió biển hay cỏ xanh trở thành một phần trong lễ cưới — giúp cảm xúc của mọi người được bộc lộ trọn vẹn và chân thật nhất.",
      naturalLight: "Tự do sáng tạo concept & décor",
      naturalLightDesc: "Không bị giới hạn bởi không gian sảnh tiệc, lễ cưới ngoài trời cho phép bạn thỏa sức biến tấu phong cách — từ bohemian phóng khoáng, rustic mộc mạc, đến elegant sang trọng — tất cả đều có thể trở thành câu chuyện riêng của hai bạn.",
      romanticSpace: "Khoảnh khắc đáng nhớ &\nhình ảnh tuyệt đẹp",
      romanticSpaceDesc: "Ánh sáng tự nhiên, khung cảnh trời biển hay khu vườn xanh sẽ tạo nên những bức ảnh cưới sống động và đầy cảm xúc — để mỗi khung hình đều là một kỷ niệm khó quên.",
      outdoorHeroSubtitle: "Tạo nên không gian tiệc cưới ngoài trời lãng mạn,\nhòa mình với thiên nhiên",
      readyForOutdoorWedding: "Sẵn Sàng Tạo Nên Tiệc Cưới Ngoài Trời Hoàn Hảo?",
      contactForFreeConsult: "Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí",

      // Event Service
      eventServiceTitle: "TRANG TRÍ SỰ KIỆN",
      eventServiceSubtitle: "Tổ chức và trang trí các sự kiện đặc biệt",
      eventServiceTitle2: "Dịch Vụ Trang Trí Sự Kiện",
      birthday: "Sinh Nhật",
      birthdayDesc: "Trang trí tiệc sinh nhật ấn tượng, vui nhộn",
      conference: "Hội Nghị",
      conferenceDesc: "Tổ chức hội nghị, sự kiện doanh nghiệp chuyên nghiệp",
      yearEndParty: "Tiệc Tất Niên",
      yearEndPartyDesc: "Tổ chức tiệc tất niên công ty ấm cúng",
      otherEvents: "Sự Kiện Khác",
      otherEventsDesc: "Trang trí các sự kiện đặc biệt theo yêu cầu",
      needEventOrganization: "Cần Tổ Chức Sự Kiện?",
      contactForQuote: "Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết",
      eventCTATitle:"Bạn Cần Tổ Chức Sự Kiện?",
      eventCTASubTitle:"Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết",

      // Portfolio Page
      portfolioHeroTitle1: "We'll create",
      portfolioHeroTitle2: "wedding décor to suit your",
      weddingDecor: "TRANG TRÍ TIỆC CƯỚI NGOÀI TRỜI",
      ancestorDecorCategory: "LỄ GIA TIÊN",
      restaurantDecorCategory: "TRANG TRÍ SẢNH CƯỚI",
      by: "By",
      continueReading: "Continue Reading",

      // Portfolio Descriptions
      nathanTracyDesc: "Câu chuyện tình yêu định mệnh được tái hiện qua không gian tiệc cưới lãng mạn với tông màu pastel nhẹ nhàng, hoa tươi tràn ngập và ánh nến lung linh.",
      tienWilliamDesc: "Đám cưới bên bờ biển yên bình với phong cách tối giản, thanh lịch. Sắc trắng tinh khôi hòa quyện cùng màu xanh của biển cả tạo nên không gian trong trẻo, đầy cảm xúc.",
      vanTucDesc: "Lễ gia tiên trang trọng với không gian trang trí truyền thống kết hợp hiện đại. Bàn thờ gia tiên được trang hoàng cẩn thận với hoa sen trắng và nến đỏ, thể hiện sự kính trọng với tổ tiên.",
      tranTaiDesc: "Tiệc cưới sang trọng với concept vườn cổ tích. Ánh đèn vàng ấm áp, hoa hồng trắng và backdrop lãng mạn tạo nên bầu không khí ngọt ngào cho ngày trọng đại của cặp đôi.",
      mayMattDesc: "Không gian lễ gia tiên ấm cúng với phong cách Á Đông đương đại. Hương trầm thoang thoảng, hoa cúc vàng và nến lung linh tạo nên không khí thiêng liêng, trang nghiêm.",
      duyenStevenDesc: "Tiệc cưới phong cách Rustic kết hợp Vintage với gỗ tự nhiên, hoa dại và ánh sáng Edison. Không gian ấm áp, gần gũi nhưng không kém phần tinh tế và đẳng cấp.",
      hanTuanDesc: "Hành trình tìm về chính mình được thể hiện qua không gian tiệc cưới đầy cảm hứng. Sự kết hợp hài hòa giữa phong cách hiện đại và nét đẹp truyền thống Việt Nam.",
      phuongHienDesc: "Lễ gia tiên ấm áp với không gian trang trí tinh tế, kết hợp hoa sen và hương trầm. Mỗi chi tiết đều được chăm chút kỹ lưỡng để tạo nên không khí trang nghiêm, đầy ý nghĩa.",
      myDuyDesc: "Ngày ngọt ngào nhất với lễ gia tiên được trang trí bằng hoa tươi pastel và nến thơm. Không gian ấm cúng, gần gũi nhưng vẫn giữ được nét trang trọng của nghi lễ truyền thống.",
      duyMy2Desc: "Tiệc cưới thanh lịch với không gian trang trí hiện đại và tinh tế. Tông màu trắng và xanh pastel kết hợp với hoa tươi cao cấp tạo nên bầu không khí trong lành và đẳng cấp.",
      phuongHien2Desc: "Tiệc cưới sang trọng với concept hoa tươi tràn ngập. Backdrop hoa hồng trắng kết hợp ánh đèn vàng tạo nên không gian lãng mạn, đẳng cấp cho buổi tiệc đáng nhớ.",
      phuongHien3Desc: "Thanh lịch vàng kim với không gian sang trọng và đẳng cấp. Tông màu vàng gold, trắng ngà và xanh emerald kết hợp với hoa hồng cao cấp, pha lê và chi tiết vàng kim tạo nên bầu không khí lộng lẫy và quý phái.",
      elopementDesc: "Đám cưới riêng tư, chỉ có hai người với không gian trang trí tối giản nhưng đầy cảm xúc. Mỗi chi tiết nhỏ đều mang ý nghĩa sâu sắc, tạo nên khoảnh khắc đáng nhớ nhất.",
      hieuBrianDesc: "Chào đón về nhà với tiệc cưới ấm áp, đầy cảm xúc. Không gian được trang trí với tông màu kem và vàng gold, kết hợp hoa tươi và ánh nến tạo nên bầu không khí ấm cúng như chính tổ ấm mới.",
      duyYenDesc: "Tình yêu vĩnh cửu được thể hiện qua không gian tiệc cưới lãng mạn với tông màu trắng và hồng pastel. Hoa hồng trắng, hoa cẩm chướng và ánh nến lung linh tạo nên bầu không khí ngọt ngào và ấm áp.",
      thoaBinhDesc: "Thiên đường vườn hoa với không gian tràn ngập màu sắc và sức sống. Tông màu xanh lá và trắng kết hợp với hoa tươi nhiệt đới tạo nên bầu không khí tươi mát và trong lành.",
      anNghiDesc: "Thanh lịch hiện đại với tông màu trắng và xám bạc. Hoa tươi trắng tinh khôi được sắp xếp theo phong cách tối giản, kết hợp ánh đèn LED tạo nên không gian sang trọng và đẳng cấp.",
      anhToanDesc: "Hồng lãng mạn với tông màu hồng blush và trắng kem. Hoa hồng, hoa mẫu đơn và các loại hoa pastel tạo nên không gian ngọt ngào, dịu dàng và đầy cảm xúc.",
      hanTungDesc: "Lãng mạn cổ điển với phong cách vintage đầy quyến rũ. Tông màu kem, vàng gold và nâu gỗ kết hợp với hoa hồng cổ và các vật dụng cổ điển tạo nên không gian đầy hoài niệm.",
      joshLindaDesc: "Thiên đường nhiệt đới với không gian đầy màu sắc và năng lượng. Tông màu xanh lá, cam và vàng kết hợp với hoa thiên điểu và lá nhiệt đới tạo nên bầu không khí tươi mới và sống động.",
      maiMyToanEmDesc: "Quyến rũ mộc mạc với phong cách rustic gần gũi và chân thật. Tông màu nâu gỗ, trắng kem và xanh lá nhạt kết hợp với gỗ tự nhiên, hoa dại và vật dụng vintage tạo nên không gian ấm cúng và đầy cá tính.",
      nganNhatDesc: "Sang trọng hiện đại với không gian đầy ánh sáng và tinh tế. Tông màu trắng, vàng champagne và xanh mint kết hợp với pha lê, gương và hoa tươi cao cấp tạo nên bầu không khí lộng lẫy và đẳng cấp.",
      nghiaNguyetDesc: "Cổ tích lãng mạn với không gian mơ mộng như trong truyện cổ tích. Tông màu hồng phấn, trắng và vàng gold kết hợp với hoa hồng, voan lụa và ánh nến tạo nên bầu không khí ngọt ngào và đầy ma thuật.",
      thongHuyenDesc: "Thanh lịch tối giản với không gian sạch sẽ và tinh tế. Tông màu trắng, be và xanh nhạt kết hợp với hoa tươi tối giản và ánh sáng tự nhiên tạo nên bầu không khí trong trẻo và thanh thoát.",
      tramMaxDesc: "Boho chic với không gian tự do và phóng khoáng. Tông màu đất, cam đỏ và xanh olive kết hợp với hoa dại, lông vũ và macramé tạo nên bầu không khí tự nhiên và đầy nghệ thuật.",
      tranTai2Desc: "Truyền thống thiêng liêng với lễ gia tiên trang trọng và đầy ý nghĩa. Tông màu đỏ truyền thống và vàng gold kết hợp với hoa sen, hương trầm và các vật phẩm nghi lễ tạo nên không gian tôn kính tổ tiên.",
      vietQuynhDesc: "Cổ điển sang trọng với không gian đầy tinh tế và đẳng cấp. Tông màu trắng ngà, vàng gold và xanh emerald kết hợp với hoa hồng cao cấp và pha lê tạo nên bầu không khí lộng lẫy và quý phái.",
      vietQuynh2Desc: "Truyền thống hài hòa với lễ gia tiên trang trọng và ấm cúng. Tông màu đỏ truyền thống, vàng gold và trắng ngà kết hợp với hoa sen, hương trầm tạo nên không gian thiêng liêng và đầy ý nghĩa.",
      vyKhangDesc: "Hoa xuân nở rộ với không gian tràn đầy sức sống và màu sắc. Tông màu hồng đào, vàng và xanh lá non kết hợp với hoa đào, hoa mai và hoa lan tạo nên bầu không khí tươi vui và rực rỡ.",
      trangViniDesc: "Lãng mạn mơ mộng với không gian tràn ngập hoa tươi và ánh sáng. Tông màu trắng, hồng pastel và xanh mint nhẹ nhàng kết hợp với voan lụa và fairy lights tạo nên bầu không khí lung linh như trong giấc mơ.",
      benangDesc: "Sự kiện đặc biệt với không gian trang trí chuyên nghiệp và ấn tượng. Thiết kế linh hoạt phù hợp với nhiều loại hình sự kiện từ hội nghị, tiệc tất niên đến các buổi gặp gỡ doanh nghiệp.",
      ngocShawnDesc: "Tình yêu vĩnh cửu vượt biên giới với không gian kết hợp tinh tế giữa Á Đông và phương Tây. Tông màu trắng, hồng pastel và vàng gold nhẹ nhàng tạo nên bầu không khí lãng mạn và sang trọng cho đám cưới quốc tế.",


      // Portfolio Detail - Nathan & Tracy
      nathanTracySubtitle: "Nathan & Tracy - Định Mệnh Tìm Thấy Nhau",
      nathanTracyConcept: "Found By Fate & Bloom #2 Decoration",
      nathanTracyFullDesc: "Trong không khí Vietnam Wedding Week 2024, lễ cưới của Nathan & Tracy đã mang đến không gian Wedding Art Decor đầy mê hoặc với concept \"Định Mệnh\". Toàn bộ không gian được thiết kế xoay quanh câu chuyện tình yêu định mệnh của cặp đôi.\n\nKhông ngừng tìm kiếm ánh \"Mặt trời\" - cảm xúc tràn đầy về sự bình yên trong tâm hồn mà cả hai đã tìm thấy ở nhau. Mỗi chi tiết đều mang một ý nghĩa sâu sắc, từ màu sắc đến hoa tươi, tất cả đều được lựa chọn cẩn thận để kể lại câu chuyện tình yêu của họ.",

      // Portfolio Detail - Tien & William
      tienWilliamSubtitle: "Tien & William - Tình Yêu Bên Bờ Biển",
      tienWilliamConcept: "Quiet Coastal Love Decoration",
      tienWilliamFullDesc: "Đám cưới bên bờ biển yên bình với phong cách tối giản, thanh lịch. Sắc trắng tinh khôi hòa quyện cùng màu xanh của biển cả tạo nên không gian trong trẻo, đầy cảm xúc.\n\nConcept \"Quiet Coastal Love\" mang đến sự nhẹ nhàng, thanh thoát như làn gió biển. Mỗi chi tiết được thiết kế tối giản nhưng đầy tinh tế.",

      // Portfolio Detail - Han & Tuan
      hanTuanSubtitle: "Han & Tuan - Lãng Mạn Vườn Hoa",
      hanTuanConcept: "Elegant Garden Romance Decoration",
      hanTuanFullDesc: "Lễ cưới của Han & Tuan là sự kết hợp hoàn hảo giữa vẻ đẹp cổ điển và hiện đại. Không gian được thiết kế với concept vườn hoa lãng mạn, nơi mỗi chi tiết đều toát lên sự tinh tế và sang trọng.",

      // Tags
      ancestorCeremonyTag: "Lễ Hỏi & Gia Tiên",
      ritualTag: "Nghi Lễ",
      spaceTag: "Không Gian",
      ancestorAltarTag: "Lễ Gia Tiên",
      ancestorDecorTag: "Trang Trí Gia Tiên",
      colorToneTag: "Trang Màu",
      blueWhiteTag: "Xanh Trang",
      weddingPartyTag: "Tiệc Cưới",
      beachWeddingTag: "Beach Wedding",
      destinationTag: "Destination",
      whiteToneTag: "Tông Trắng",
      minimalistTag: "Minimalist",
      gardenWeddingTag: "Garden Wedding",
      romanticTag: "Romantic",
      pastelToneTag: "Tông Pastel",
      elegantTag: "Elegant",
      freshFlowersTag: "Hoa Tươi"
    }
  },
  en: {
    translation: {
      // Header
      hotline: "Hotline",

      // Navbar
      home: "HOME",
      services: "SERVICES",
      work: "ANTWORK",
      blog: "BLOG",
      about: "ABOUT US",
      contact: "CONTACT",

      // Services Dropdown
      destinationWedding: "Outdoor Destination Wedding",
      restaurantWedding: "Wedding Hall Decoration",
      ancestorCeremony: "Traditional Vietnamese Wedding",
      eventDecor: "Event Decoration",

      // Hero
      wedding: "Wedding",
      heroTitle: "Where Your Dream Wedding Comes to Life",
      readMore: "Read more",

      // Service Cards
      ancestorDecor: "TRADITIONAL VIETNAMESE CEREMONY",
      ancestorDesc: "At Ant, the engagement ceremony harmoniously blends Vietnamese tradition with modern elegance — preserving its true meaning while bringing emotions and grace into one.",
      outdoorDecor: "OUTDOOR WEDDING",
      outdoorDesc: "With each couple, ANT designs emotional outdoor weddings — where nature becomes the canvas and every celebration tells a love story of its own.",
      restaurantDecor: "WEDDING HALL DECORATION",
      restaurantDesc: "Ant breathes life into your wedding space, turning it into a unique aisle where every corner is delicately crafted to mirror your love and personal style.",
      restaurantDesc1: "Redefine the ballroom into your one-of-a-kind wedding aisle",
      eventDecorTitle: "EVENT DECORATION",
      eventDecorDesc: "ANT is honored to be part of your most meaningful moments — from birthdays and anniversaries to proposals and many other beautiful celebrations in life.",
      viewDetails: "VIEW DETAILS",

      // Stats
      yearsExperience: "YEARS OF EXPERIENCE",
      couplesServed: "COUPLES HAVE PLACED THEIR TRUST\N IN ANT",
      // couples have placed their trust in Ant

      // Banner
      bannerTitle1: "Where your inspiration",
      bannerTitle2: "becomes wedding art",
      bannerDesc: "With years of experience in the wedding industry and a flexible creative approach, ANT Wedding designs personalized décor inspired by your story and style. We’re here to bring not only beauty, but also peace of mind throughout the entire process — so your wedding day becomes a truly complete and unforgettable memory.",
      designPackages: "OUR SIGNATURE WEDDINGS",

      // Why Choose Us
      whyChooseUs: "WHY CHOOSE ANT WEDDING",
      whyChooseDesc: " Ant Wedding believes that every celebration of love deserves to be\n created with dedication, meticulous care, and heartfelt passion — just like your own story.",
      trustedBrand: "DEDICATION – UNDERSTANDING – UNIQUENESS",
      trustedBrandDesc: "Each concept is crafted from deep understanding and the couple’s personal style — never repeated, never formulaic. Ant Wedding doesn’t just create a beautiful setup, but a storytelling space filled with flowers, lights, and emotions.",
      professionalProcess: "PROFESSIONALISM – PRECISION",
      professionalProcessDesc: "We accompany every couple throughout the entire preparation journey, ensuring that every moment flows effortlessly and meaningfully. From concept design to execution, every detail is carefully refined by the Ant team.",
      highExpertise: "EXPERIENCE – EXPERTISE",
      highExpertiseDesc: "With extensive experience in organizing weddings at resorts, beaches, and elegant venues, Ant Wedding understands the unique characteristics of each location. We bring you intelligent, suitable, and efficient décor solutions — ensuring a transparent process, on-time delivery, and the highest quality outcomes.",

      //ArtWork
      workSubTitle: "Where Your Dream Wedding Comes to Life",

      // Footer
      contactUs: "Contact us",
      ourPhone: "Our phone number:",
      ourEmail: "Our Email:",
      ourAddress: "Our Address:",
      addressDetail: "Ngô Gia Tự Apartment - Nha Trang - Khánh Hòa - Việt Nam",
      appointmentNote: "(Please make an appointment in advance)",
      followAnt: "FOLLOW ANT",
      followers: "followers",
      followPage: "Follow Page",
      share: "Share",
      tagline: "Ant Wedding – Draw Your Wedding Dream",
      footerNote: "from ANT Wedding with So Much Love",

      // Contact Page
      officeAddress: "Office & Production:",
      nhatrangAddress: "Ngô Gia Tự Apartment - Nha Trang - Khánh Hòa - Việt Nam",
      makeAppointment: "(Please make an appointment in advance)",
      contactInfo: "Contact:",
      consultant: "Service Consultant:",
      workingHours: "Working Hours:",
      workingHoursDesc: "We work from",
      to: "to",
      workingDays: "on weekdays",
      exceptHolidays: "(Except holidays)",
      afterHoursSupport: "For urgent support outside working hours, please contact",
      fanpage: "Fanpage",
      followOurPage: "Follow Our Fanpage",

      // Portfolio Page
      ourWork: "OUR WORK",
      portfolioDesc: "Discover the beautiful wedding spaces we have created",
      viewPortfolio: "VIEW DETAILS",

      // Portfolio Detail
      concept: "Concept:",
      weddingAddress: "Wedding Address:",
      photographer: "Photographer & Videographer:",
      tags: "Tags:",
      newer: "Newer",
      older: "Older",
      noPrevious: "No Previous",
      noNext: "No Next",

      // Introduce
      helloWeAre: "HELLO, THIS IS ANT WEDDING",
      introTitle1: "Creative, Genuine.",
      introTitle2: "Trustworthy\n Always Inspired,",
      // introTitle3: "",
      introDesc: "Founded in 2019, when wedding decoration in Vietnam was becoming more recognized and appreciated by modern couples, ANT Wedding was born from a desire to create weddings that are not only beautiful, but also meaningful.\n From the very beginning, we’ve believed that every celebration should tell a love story – through space, light, and every delicate floral detail🌿\n With a solid foundation in design and years of experience, ANT Wedding proudly stands among the pioneering Wedding Design and Decoration Services in Nha Trang, Khanh Hoa, and surrounding areas. We offer full-service wedding design – from planning and styling to complete decoration – ensuring that every event feels personal, elegant, and truly yours.\n ANT Wedding – where love stories are told through elegance and sincerity. ✨\n Ngoc Anh & Nha Tinh\n Founders of Ant Wedding",
      introQuote: "At Ant Wedding, we believe that true beauty begins with understanding. Every celebration we create reflects the couple’s dreams – just the way they imagined.",
      founders: "Ngoc Anh & Nha Tinh",
      founderTitle: "Founder Ant Wedding",

      // Service Page
      ourServices: "Our Services",
      ourServicesDesc: "Ant Wedding provides diverse decoration services for all your special events",
      trustedBrandDesc2: "Over 15 years of experience in wedding decoration",
      professionalProcessDesc2: "Professional and dedicated team with rigorous work process",
      highExpertiseDesc2: "Always updating the latest trends in decoration",
      readyForPerfectWedding: "Ready to create the perfect wedding?",
      contactForFreeConsultation: "Contact us today for free consultation",

      // About Us Page
      aboutUs: "ABOUT US",
      aboutUsTagline: "Ant Wedding Decor - Creating Memorable Moments",
      ourStory: "Our Story",
      ourStoryDesc1: "Ant Wedding Decor was founded by Ngoc Anh & Nha Tinh – two people who share a deep passion for the art of decoration and a love for creating meaningful wedding moments.",
      ourStoryDesc2: "Starting in 2019 with a small team, Ant has grown through every project and every love story we’ve had the honor to be part of. For us, each wedding is not just a celebration — it’s a storytelling journey through flowers, light, and emotions, where every detail is crafted with dedication and genuine happiness.",
      ourFounders: "Our Founders",
      coFounderCreativeDirector: "Co-Founder & Creative Director",
      coFounderOperationsDirector: "Co-Founder & Operations Director",
      founderDesc1: "Constantly exploring new ideas and pushing creative boundaries, Nha Tinh brings a unique spirit to every wedding — modern, refined, and full of inspiration. She believes that a beautiful wedding décor should not only look stunning, but also tell the love story of two people in the most heartfelt way.",
      founderDesc2: "With years of experience in event management and coordination, Ngoc Anh ensures every project runs seamlessly from start to finish. Her attention to detail and strong organizational skills guarantee that each wedding unfolds perfectly — from the very first idea to the final magical moment.",
      coreValues: "Core Values",
      dedicated: "Empathy",
      dedicatedDesc: "We listen deeply — to understand your love story, not just decorate it.",
      creative: "Craftsmanship",
      creativeDesc: "Every detail matters — because your once-in-a-lifetime day deserves nothing less than perfection.",
      professional: "Commitment",
      professionalDesc: "We’re not just your wedding decorators — we’re your teammates in creating memories.",
      ourTeam: "Our Team",
      projectsCompleted: "Projects Completed",
      yearsOfExperience: "Years of Experience",
      teamMembers: "Team Members",
      customerSatisfaction: "Customer Satisfaction",
      letUsJoinYou: "Let Us Join You",
      contactForPlanning: "Contact us now for consultation and planning for your special day",
      sendConsultationRequest: "Send Consultation Request",

      // Service Detail Pages - Common
      aboutService: "About Service",
      completedProjects: "Completed Projects",
      workflowProcess: "Workflow Process",
      consultation: "Consultation",
      consultationDesc1: "Listening to your ideas and providing concept recommendations.",
      preparation: "Design",
      preparationDesc1: "Creating 3D designs\n and detailed quotations.",
      construction: "Execution",
      constructionDesc1: "On-site setup and decoration.",
      completion: "Completion",
      completionDesc1: "Final inspection and flawless handover.",
      needConsultation: "Need Consultation?",
      contactForDetails: "Contact us for detailed consultation",

      // Ancestor Service
      ancestorServiceTitle: "About Ancestor Ceremony Decoration Service",
      ancestorServiceSubtitle: "Crafted to honor Vietnamese heritage with warmth and grace — a meaningful\n setting for the sacred beginning of two hearts united.",
      ancestorServiceSubtitleHero: "A heartfelt Vietnamese traditional ceremony\n that honors timeless customs",
      ancestorAltar: "Main Gate",
      ancestorAltarDesc: "Being the first impression guests receive upon arrival — a warm and graceful welcome to the celebration. Ant designs each gate to reflect harmony in color, florals, and overall style, blending tradition and modern aesthetics to mark the beautiful beginning of the day.",
      flowersAndFruits: "Backdrop",
      flowersAndFruitsDesc: "This is the heart of the ancestral ceremony space — where key rituals are performed and the most cherished moments are captured. Every detail, from flower arrangement to material selection, is thoughtfully designed by Ant to honor the ceremony’s elegance while reflecting the family’s personal touch.",
      candlesAndIncense: "Family Reception Table",
      candlesAndIncenseDesc: "The family reception table is where both families gather to witness the ceremony and share joy together. Ant creates a warm and refined setting that balances traditional formality with intimacy — ensuring this meaningful moment of union feels truly heartfelt.",
      spaceDecoration: "Traditional Wedding Offerings",
      spaceDecorationDesc: "The wedding offerings symbolize respect, gratitude, and the bond between two families — a deeply rooted tradition in Vietnamese culture. Ant carefully arranges and decorates each tray with freshness and grace, turning every element into a beautiful gesture of blessings for the couple’s new journey.",
      ancestorMeaning: "Meaning of Ancestor Ceremony",
      honorAncestors: "Honor Ancestors",
      honorAncestorsDesc: "Express gratitude and respect to ancestors and grandparents",
      familyBonding: "Family Bonding",
      familyBondingDesc: "Connect two families, create unity and togetherness",
      preserveTradition: "Preserve Tradition",
      preserveTraditionDesc: "Maintain and promote good customs of the nation",
      necessaryItems: "Necessary Items",
      fiveFruitTray: "Five Fruit Tray",
      fiveFruitTrayDesc: "Fresh and beautiful fruits, symbolizing prosperity",
      freshFlowers: "Fresh Flowers",
      freshFlowersDesc: "Lotus, white chrysanthemums or seasonal flowers, solemn decoration",
      candlesIncense: "Candles & Incense",
      candlesIncenseDesc: "Red candles, high-quality incense, solemn altar lamps",
      wineAndTea: "Wine & Tea",
      wineAndTeaDesc: "White wine, green tea, filtered water for ancestor offerings",
      riceAndSalt: "Rice & Salt",
      riceAndSaltDesc: "White rice, white salt according to traditional customs",
      votive: "Votive Paper",
      votiveDesc: "Votive paper, ritual money according to family customs",
      needAncestorConsultation: "Need Consultation About Ancestor Ceremony?",
      contactForCustomDetails: "Contact us for detailed consultation about customs and preparation",

      // Ancestor Process Steps
      ancestorConsultation: "Consultation",
      ancestorConsultationDesc: "Understanding your family’s traditions and offering a design plan that feels truly yours.",
      ancestorPreparation: "Design",
      ancestorPreparationDesc: "Developing the concept, creating detailed layouts, and presenting a clear quotation.",
      ancestorConstruction: "Execution",
      ancestorConstructionDesc: "Bringing the design to life with thoughtful setup and precise on-site decoration.",
      ancestorCompletion: "Completion",
      ancestorCompletionDesc: "Final inspection and handover — ensuring every detail is in place for the big day.",

      //Ancestor Benefit
      ancestorBenefitTitle:"Le Gia Tien – A Timeless Vietnamese Wedding Tradition",
      ancestorBenefitTitle1:"Expressing Gratitude & Respect",
      ancestorBenefitSubTitle1:"The Le Gia Tien (Ancestral Ceremony) is a sacred moment for the couple to offer incense and pay respect to their ancestors — those who gave life, guidance, and blessings. It embodies filial piety and honors one of the most beautiful traditions in Vietnamese family culture.",
      ancestorBenefitTitle2:"Introducing The Couple",
       ancestorBenefitSubTitle2:"This ceremony marks the official union of two families, where the bride and groom are formally introduced to each side. It represents the bond, respect, and shared joy between both families as they welcome a new beginning together.",
      ancestorBenefitTitle3:"Blessing For Happiness & Harmony",
       ancestorBenefitSubTitle3:"Beyond ritual, the Le Gia Tien carries heartfelt wishes for the couple’s marriage — a life filled with love, peace, and prosperity, under the blessings and protection of their ancestors.",
      ancestorBenefitTitle4:"Preserving & Continuing",
       ancestorBenefitSubTitle4:"In a modern world, this ceremony connects the past with the present — allowing younger generations to honor, cherish, and continue the timeless beauty of Vietnamese traditions on their wedding day.",

       // Ancestor CTA
      ancestorCTATitle: "Planning A Traditional Ceremony?",
      ancestorCTASubTitle: "Reach out to us for personalized advice on customs and preparation details.",      

      // Ancestor Portfolio
      ancestorModernCeremony: "TRAN & TAI",
      ancestorElegantCeremony: "THOA & BINH",
      ancestorElegantCeremony2: "SWEETEST DAY",
      ancestorElegantCeremony3: "VY & KHANG",

      // Restaurant Wedding Service
      restaurantFeaturesTitle: "Wedding Hall Decoration Categories",
      restaurantFeaturesSubTitle: "Every detail is carefully curated to form a harmonious, elegant space that reflects the couple’s personal touch.",
      restaurantHallTitle: "Backdrop",
      restaurantHallDesc: "Being the first impression as guests enter — a reflection of the couple’s style and the overall wedding atmosphere. Ant designs each backdrop to be both harmonious and memorable, ensuring it becomes a highlight of every photo.",
      restaurantMenuTitle: "Gallery",
      restaurantMenuDesc: "More than just a display table, the gallery is where your love story unfolds. Every detail — from the photos to the flowers and lighting — is thoughtfully curated by Ant to evoke warmth and emotion.",
      restaurantStaffTitle: "Aisle",
      restaurantStaffDesc: "Marks a short yet meaningful journey — where the couple walks amidst love and anticipation. Ant transforms it into a dreamy pathway, where every bloom and light leads you toward your forever moment.",
      restaurantDecorConceptTitle: "Main Stage",
      restaurantDecorConceptDesc: "This is the heart of the celebration — where emotions peak and promises are made. Ant blends artistry with intimacy to craft a stage that’s elegant, heartfelt, and unforgettable.",
      restaurantProcessTitle: "Event Organization Process",
      restaurantConsultation: "Consultation",
      restaurantConsultationDesc: "Advise on space, menu and services",
      restaurantPlanning: "Planning",
      restaurantPlanningDesc: "Design concept and detailed quotation",
      restaurantPreparation: "Preparation",
      restaurantPreparationDesc: "Prepare menu and hall decoration",
      restaurantExecution: "Execution",
      restaurantExecutionDesc: "Perfect service and event coordination",
      restaurantPortfolioTitle: "Spaces & Moments",
      restaurantPortfolio1: "FROM FRIEND TO PARTNER",
      restaurantPortfolio2: "VAN & TUC",
      restaurantPortfolio3: "DUYEN & STEVEN",
      restaurantPortfolio4: "SWEETEST DAY",
      outdoorBenefitsRes: "The Beauty Of An Indoor Wedding",
      spaciousSpaceRes: "Worry-free, come rain or shine",
      spaciousSpaceResDesc: "An indoor wedding gives you absolute peace of mind — no need to worry about the weather. Every sound, every light, and every moment is perfectly managed to ensure your celebration unfolds flawlessly.",
      naturalLightRes: "Elegant space – comfortable and easily personalized",
      naturalLightResDesc: "Modern ballrooms offer a full range of amenities: professional lighting, sound, air-conditioning, and service. Ant Wedding transforms these spaces to reflect each couple’s unique story — whether minimalist, romantic, or bold and dramatic.",
      romanticSpaceRes: "Convenient and connected for all guests",
      romanticSpaceResDesc: "Located in central areas with full facilities, indoor venues make it easier for guests to gather, celebrate, and share the joy of your day. Every detail is taken care of, so all you need to do is enjoy the moment.",
      readyForPerfectWeddingRes: "Let's Draw Your Wedding Dream",
      contactForFreeConsultationRes: "Connect today for a complimentary consultation.",


      // Outdoor/Destination Service
      outdoorServiceTitle: "Outdoor Wedding Categories",
      outdoorServiceSubtitle: "Every wedding detail — is thoughtfully designed to create a harmonious and memorable outdoor celebration.",
      backdropAndArch: "Backdrop & Flower Arch",
      backdropAndArchDesc: "The most iconic area of a wedding — where the couple’s unique style shines through every floral detail. Designed to harmonize with the outdoor setting, this space sets the tone for the entire celebration.",
      tablesAndWalkway: "Gallery Area",
      tablesAndWalkwayDesc: "A space to keep the heartfelt wishes and memories from guests — where the couple’s love story is beautifully told through photos, details, and emotions.",
      lighting: "Dining Area",
      lightingDesc: "More than just a place to dine, it’s where laughter, conversations, and heartfelt emotions unfold — as guests celebrate the couple’s journey together.",
      themeDecoration: "Bridal Bouquet & Boutonniere",
      themeDecorationDesc: "A bouquet may be small, but it carries the bride’s care and attention to detail — a delicate reflection of love and devotion woven into every petal.",
      outdoorBenefits: "An Outdoor Wedding Brings...",
      spaciousSpace: "Natural Spaces,\n Genuine Emotions",
      spaciousSpaceDesc: "An outdoor wedding brings warmth and authenticity — where natural light, ocean breeze, and soft greenery become part of the celebration. It’s a space where emotions unfold naturally, and every moment feels intimate and real.",
      naturalLight: "Freedom to Create Your Own Concept & Décor",
      naturalLightDesc: "Without the limits of an indoor venue, an outdoor wedding lets you express your unique style — from free-spirited bohemian and rustic charm to timeless elegance. Every detail tells your love story in its own beautiful way.",
      romanticSpace: "Unforgettable Moments & Stunning Visuals",
      romanticSpaceDesc: "Surrounded by nature’s beauty — the sunlight, the sea, the garden — every photo becomes a vivid, emotional memory. Each frame captures not just the scene, but the feeling of the day.",
      outdoorHeroSubtitle: "Create romantic outdoor wedding space,\nimmersed in nature",
      readyForOutdoorWedding: "Ready To Bring Your Dream Outdoor Wedding To Life?",
      contactForFreeConsult: "Let’s connect today for a complimentary consultation.",

      // Event Service
      eventServiceTitle: "EVENT DECORATION",
      eventServiceTitle2: "Event Decoration Service",
      eventServiceSubtitle: "Event Organization and Decoration",
      birthday: "Birthday Party",
      birthdayDesc: "Impressive, fun, and vibrant celebrations.",
      conference: "Conference",
      conferenceDesc: "Professional planning for business events.",
      yearEndParty: "Year-End Party",
      yearEndPartyDesc: "Cozy and cheerful corporate celebrations.",
      otherEvents: "Other Events",
      otherEventsDesc: "Bespoke styling for any special occasion.",
      needEventOrganization: "Need Event Organization?",
      contactForQuote: "Contact us for consultation and detailed quote",
      eventCTATitle:"Looking to Host a Memorable Event?",
      eventCTASubTitle:"Contact us today for tailored consultation.",

      // Portfolio Page
      portfolioHeroTitle1: "We'll create",
      portfolioHeroTitle2: "wedding décor to suit your",
      weddingDecor: "OUTDOOR WEDDING DECORATION",
      ancestorDecorCategory: "TRADITIONAL VIETNAMESE CEREMONY",
      restaurantDecorCategory: "WEDDING HALL DECORATION",
      by: "By",
      continueReading: "Continue Reading",

      // Portfolio Descriptions
      nathanTracyDesc: "A destined love story recreated through a romantic wedding space with soft pastel tones, abundant fresh flowers and sparkling candlelight.",
      tienWilliamDesc: "A peaceful beach wedding with minimalist, elegant style. Pure white blends with the blue of the sea to create a pure, emotional space.",
      vanTucDesc: "Solemn ancestor ceremony with traditional decoration combined with modern style. The ancestor altar is carefully decorated with white lotus flowers and red candles, showing respect for ancestors.",
      tranTaiDesc: "Luxurious wedding with fairy garden concept. Warm yellow lights, white roses and romantic backdrop create a sweet atmosphere for the couple's special day.",
      mayMattDesc: "Cozy ancestor ceremony space with contemporary Asian style. Fragrant incense, yellow chrysanthemums and sparkling candles create a sacred, solemn atmosphere.",
      duyenStevenDesc: "Rustic wedding style combined with Vintage with natural wood, wildflowers and Edison lighting. Warm, intimate space but no less sophisticated and classy.",
      hanTuanDesc: "Journey to find yourself expressed through an inspiring wedding space. Harmonious combination of modern style and traditional Vietnamese beauty.",
      phuongHienDesc: "Warm ancestor ceremony with delicate decoration space, combining lotus flowers and incense. Every detail is carefully cared for to create a solemn, meaningful atmosphere.",
      myDuyDesc: "The sweetest day with ancestor ceremony decorated with pastel fresh flowers and scented candles. Cozy, intimate space but still maintains the solemnity of traditional rituals.",
      duyMy2Desc: "Elegant wedding celebration with modern and sophisticated decoration space. White and blue pastel tones combined with premium fresh flowers create a pure and classy atmosphere.",
      phuongHien2Desc: "Luxurious wedding with concept of abundant fresh flowers. White rose backdrop combined with yellow lights creates a romantic, classy space for a memorable party.",
      phuongHien3Desc: "Golden elegance with luxurious and classy space. Gold, ivory white and emerald green tones combined with premium roses, crystal and gold details create a glamorous and noble atmosphere.",
      elopementDesc: "Private wedding, just two people with minimalist but emotional decoration. Every small detail carries deep meaning, creating the most memorable moment.",
      hieuBrianDesc: "Welcome home with a warm, emotional wedding. The space is decorated with cream and gold tones, combined with fresh flowers and candlelight to create a cozy atmosphere like a new home.",
      duyYenDesc: "Eternal love expressed through a romantic wedding space with white and pink pastel tones. White roses, carnations and sparkling candlelight create a sweet and warm atmosphere.",
      thoaBinhDesc: "Garden paradise with space full of colors and vitality. Green and white tones combined with tropical fresh flowers create a fresh and pure atmosphere.",
      anNghiDesc: "Modern elegance with white and silver gray tones. Pure white fresh flowers arranged in minimalist style, combined with LED lights create a luxurious and classy space.",
      anhToanDesc: "Romantic blush with blush pink and cream white tones. Roses, peonies and pastel flowers create a sweet, gentle and emotional space.",
      hanTungDesc: "Vintage romance with charming vintage style. Cream, gold and wood brown tones combined with vintage roses and antique items create a nostalgic space.",
      joshLindaDesc: "Tropical paradise with colorful and energetic space. Green, orange and yellow tones combined with bird of paradise flowers and tropical leaves create a fresh and vibrant atmosphere.",
      maiMyToanEmDesc: "Rustic charm with intimate and authentic rustic style. Wood brown, cream white and light green tones combined with natural wood, wildflowers and vintage items create a cozy and unique space.",
      nganNhatDesc: "Modern luxury with bright and sophisticated space. White, champagne gold and mint green tones combined with crystal, mirrors and premium fresh flowers create a glamorous and classy atmosphere.",
      nghiaNguyetDesc: "Fairy tale romance with dreamy space like in fairy tales. Blush pink, white and gold tones combined with roses, silk tulle and candlelight create a sweet and magical atmosphere.",
      thongHuyenDesc: "Elegant minimalism with clean and sophisticated space. White, beige and light blue tones combined with minimalist fresh flowers and natural light create a pure and graceful atmosphere.",
      tramMaxDesc: "Boho chic with free and bohemian space. Earth, terracotta and olive green tones combined with wildflowers, feathers and macramé create a natural and artistic atmosphere.",
      tranTai2Desc: "Sacred tradition with solemn and meaningful ancestor ceremony. Traditional red and gold tones combined with lotus flowers, incense and ritual items create a space of respect for ancestors.",
      vietQuynhDesc: "Classic elegance with sophisticated and classy space. Ivory white, gold and emerald green tones combined with premium roses and crystal create a glamorous and noble atmosphere.",
      vietQuynh2Desc: "Harmonious tradition with solemn and warm ancestor ceremony. Traditional red, gold and ivory white tones combined with lotus flowers and incense create a sacred and meaningful space.",
      vyKhangDesc: "Spring blossom with vibrant and colorful space. Peach pink, yellow and light green tones combined with peach blossoms, apricot flowers and orchids create a joyful and brilliant atmosphere.",
      trangViniDesc: "Dreamy romance with space full of fresh flowers and lights. White, pink pastel and light mint green tones combined with tulle and fairy lights create a sparkling atmosphere like in a dream.",
      benangDesc: "Special event with professional and impressive decoration space. Flexible design suitable for various types of events from conferences, year-end parties to corporate gatherings.",
      ngocShawnDesc: "Eternal love across borders with space that subtly combines East and West. White, pink pastel and light gold tones create a romantic and elegant atmosphere for an international wedding.",


      // Portfolio Detail - Nathan & Tracy
      nathanTracySubtitle: "Nathan & Tracy - Found By Fate",
      nathanTracyConcept: "Found By Fate & Bloom #2 Decoration",
      nathanTracyFullDesc: "In the atmosphere of Vietnam Wedding Week 2024, Nathan & Tracy's wedding brought a mesmerizing Wedding Art Decor space with the concept of \"Destiny\". The entire space was designed around the couple's destined love story.\n\nConstantly searching for the \"Sun\" - the overwhelming feeling of peace in the soul that both found in each other. Every detail carries deep meaning, from colors to fresh flowers, all carefully chosen to tell their love story.",

      // Portfolio Detail - Tien & William
      tienWilliamSubtitle: "Tien & William - Coastal Love",
      tienWilliamConcept: "Quiet Coastal Love Decoration",
      tienWilliamFullDesc: "A peaceful beach wedding with minimalist, elegant style. Pure white blends with the blue of the sea to create a pure, emotional space.\n\nThe \"Quiet Coastal Love\" concept brings lightness and grace like a sea breeze. Every detail is designed minimally but full of sophistication.",

      // Portfolio Detail - Han & Tuan
      hanTuanSubtitle: "Han & Tuan - Garden Romance",
      hanTuanConcept: "Elegant Garden Romance Decoration",
      hanTuanFullDesc: "Han & Tuan's wedding is a perfect combination of classic and modern beauty. The space is designed with a romantic garden concept, where every detail exudes sophistication and elegance.",

      // Tags
      ancestorCeremonyTag: "Engagement & Ancestor Ceremony",
      ritualTag: "Ritual",
      spaceTag: "Space",
      ancestorAltarTag: "Ancestor Ceremony",
      ancestorDecorTag: "Ancestor Decoration",
      colorToneTag: "Color Tone",
      blueWhiteTag: "Blue White",
      weddingPartyTag: "Wedding Party",
      beachWeddingTag: "Beach Wedding",
      destinationTag: "Destination",
      whiteToneTag: "White Tone",
      minimalistTag: "Minimalist",
      gardenWeddingTag: "Garden Wedding",
      romanticTag: "Romantic",
      pastelToneTag: "Pastel Tone",
      elegantTag: "Elegant",
      freshFlowersTag: "Fresh Flowers"
    }
  }
};

// Check if running on client side
const isClient = typeof window !== 'undefined';

// Get saved language from localStorage or use default
const savedLanguage = isClient ? (localStorage.getItem('i18nextLng') || 'vi') : 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // use saved language
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

// Save language to localStorage whenever it changes (only on client)
if (isClient) {
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
  });
}

export default i18n;
