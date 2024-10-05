
const ReturnsPolicy = () => {
  return (
    <div className="ReturnsPolicy p-4 bg-gray-100 rounded-lg shadow-md leading-10">
      <div className="mx-auto w-3/5 max-[450px]:w-full max-[450px]:p-1">
        <h2 className="text-3xl font-bold text-center mb-4">سياسة الإرجاع</h2>
        <p>نهدف إلى تقديم أفضل تجربة تسوق ممكنة لعملائنا، ولذلك نمنحكم سياسة إرجاع مرنة وسهلة. </p>
        
        <p className="mb-4"> 
          إذا كنت غير راضٍ عن أي منتج اشتريته، يمكنك إرجاعه وفق الشروط التالية:
        </p>

        <ul className="list-disc pl-6 mb-4 mr-5">
          <li className="mb-2">
            يجب إرجاع المنتج خلال <strong>14 يومًا</strong> من تاريخ الشراء.
          </li>
          <li className="mb-2">
            يجب أن يكون المنتج في حالته الأصلية وغير مستخدم، مع بقاء جميع الملصقات عليه.
          </li>
          <li className="mb-2">
            يجب تقديم إيصال أو إثبات الشراء مع المنتج المُراد إرجاعه.
          </li>
          <li className="mb-2">
            بعض المنتجات غير قابلة للإرجاع، مثل المنتجات المخصصة أو الشخصية.
          </li>
        </ul>

        <p className="mb-4">
          في حالة وجود أي استفسارات أو مشاكل تتعلق بعملية الإرجاع، يُرجى التواصل مع خدمة العملاء.
        </p>

        <div className="text-center">
          <a href="https://www.facebook.com/profile.php?id=100090664448464&locale" target='blank'>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                تواصل مع خدمة العملاء
              </button>      
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
